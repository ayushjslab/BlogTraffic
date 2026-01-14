import { openai } from "./openai";

export async function generateWithChatGPT(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast + cheap
    messages: [
      {
        role: "system",
        content: "You are a senior SaaS content strategist and technical SEO writer."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.5,
  });

  return response.choices[0].message.content;
}
