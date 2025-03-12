// import { streamText } from "ai";
// import { createOpenAI } from "@ai-sdk/openai";
// import { initialMessage } from "@/lib/data";

// const openai = createOpenAI({
//   // apiKey: envConfig.NEXT_PUBLIC_OPENAI_API_KEY || "",
//   apiKey: process.env.OPENAI_API_KEY || "",
//   compatibility: "strict",
// });

// export const runtime = "edge";
// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     const stream = await streamText({
//       model: openai("gpt-3.5-turbo"),
//       messages: [initialMessage, ...messages],
//       temperature: 1,
//     });
//     // console.log(messages)
//     return stream?.toDataStreamResponse();
//   } catch (error) {
//     console.error("Error:", error); // In chi tiết lỗi ra console
//     return new Response("An error occurred.", { status: 500 });
//   }
// }

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { openaiEmbed } from "@/lib/openai";
import { pineconeIndex } from "@/lib/pinecone";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
});

// Chạy trên Node.js để tránh lỗi "crypto"
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const userQuery = messages[messages.length - 1].content; // Lấy câu hỏi cuối cùng của user
    console.log(userQuery)
    // Chuyển câu hỏi của user thành embeddings
    const queryEmbeddingRes = await openaiEmbed.embeddings.create({
      model: "text-embedding-ada-002",
      input: userQuery,
    });
    const queryVector = queryEmbeddingRes.data[0].embedding; // Lấy vector của câu hỏi

    // Tìm kiếm sản phẩm phù hợp trong Pinecone
    const searchResults = await pineconeIndex.query({
      vector: queryVector, // So sánh vector của câu hỏi với database
      topK: 3, // Lấy 5 kết quả phù hợp (gồm sản phẩm và nội dung web)
      includeMetadata: true, // Lấy luôn metadata
    });

    // Tách sản phẩm và nội dung website
    const productMatches = searchResults.matches.filter(
      (match) => match.metadata?.type !== "website"
    );
    const websiteMatch = searchResults.matches.find(
      (match) => match.metadata?.type === "website"
    );

    let websiteInfo = "";
    if (websiteMatch) {
      websiteInfo = `\n\nThông tin hữu ích từ website:\n${websiteMatch.metadata?.content}`;
    }
    // console.log(websiteInfo);
    // Format danh sách sản phẩm
    const productList = productMatches
      .map(
        (match) =>
          `Tên sản phẩm: ${match.metadata?.name} | Mô tả: ${match.metadata?.description} | Giá: ${match.metadata?.price} VND | 🔗 [Xem sản phẩm](${match.metadata?.link})`//không cần mô tả vì đã kiếm được sản phẩm phù hợp rồi không cần tốn thêm tiền cho chat
      )
      .join("\n");

    // console.log(productList);
    const updatedMessages = [
      {
        role: "system",
        content: `Thông tin hữu ích từ website:\n${websiteInfo}\n\n` +
                 `Chỉ được phép cung cấp sản phẩm kèm link này, không tự tạo sản phẩm nào khác web:\n\n${productList}`,
      },
      ...messages,
    ];
    
    console.log(updatedMessages)
    const stream = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: updatedMessages,
      temperature: 1,
    });

    return stream?.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi chatbot:", error);
    return new Response("Lỗi server", { status: 500 });
  }
}
