import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { initialMessage } from "@/lib/data";


const openai = createOpenAI({
  // apiKey: envConfig.NEXT_PUBLIC_OPENAI_API_KEY || "",
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
});

export const runtime = "edge";
export async function POST(req: Request) {
  // const { messages } = await req.json();
  // // console.log("messages: ", messages);
  // const stream = await streamText({
  //   model: openai("gpt-3.5-turbo"),
  //   messages: [initialMessage, ...messages],
  //   temperature: 1,
  // });
  // return stream?.toDataStreamResponse();
  try {
    const { messages } = await req.json();
    const stream = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [initialMessage, ...messages],
      temperature: 1,
    });
    console.log(messages)
    return stream?.toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error); // In chi tiết lỗi ra console
    return new Response("An error occurred.", { status: 500 });
  }
}
