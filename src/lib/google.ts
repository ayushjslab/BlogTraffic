// lib/gemini.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateWithGemini(prompt: string): Promise<string> {
  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingLevel: "HIGH",
    },
    tools,
  };

  const model = "gemini-2.5-flash-lite";

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let finalText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      finalText += chunk.text;
    }
  }

  return finalText.trim();
}
