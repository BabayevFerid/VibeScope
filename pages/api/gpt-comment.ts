// pages/api/gpt-comment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { mood } = req.body;

  const prompt = `Aşağıdakı musiqi ruh halı üçün qısa, poetik və emosional bir şərh yaz: "${mood}"`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const comment = completion.choices[0].message.content;
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ error: "GPT xətası" });
  }
}
