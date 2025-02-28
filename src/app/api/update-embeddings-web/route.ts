import { openaiEmbed } from "@/lib/openai";
import { pineconeIndex } from "@/lib/pinecone";

export async function POST(req: Request) {
  try {
    const websiteSections = await req.json();
    // console.log(websiteSections)
    // Lấy sản phẩm từ database
    for (const section of websiteSections) {
      const embeddingRes = await openaiEmbed.embeddings.create({
        model: "text-embedding-ada-002",
        input: section.content,
      });
      
      const vector = embeddingRes.data[0].embedding;

      await pineconeIndex.upsert([
        {
          id: section.id,
          values: vector,
          metadata: {
            type: "website",
            content: section.content,
          },
        },
      ]);
    }
    return new Response(
      JSON.stringify({
        message: "Cập nhật embeddings cho website thành công!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi cập nhật embeddings:", error);
    return new Response(JSON.stringify({ error: "Lỗi server" }), {
      status: 500,
    });
  }
}
