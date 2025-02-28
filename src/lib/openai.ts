import OpenAI from "openai";

export const openaiEmbed = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  