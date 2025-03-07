import type{ Request, Response } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyBIw0do3MFlZabQTNa_ISryw9dk4uon6Lw') ;
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = model.startChat({
    history: [
    {
        role: "user",
        parts: [{ text: "Hello" }],
    },
    {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
    ],
});

export async function getRoadmap(req: Request, res: Response): Promise<void> {
    let result = await chat.sendMessage("I have 2 dogs in my house.");
    console.log(result.response.text());
    res.json({ message: "hi from getRoadmap" });
}