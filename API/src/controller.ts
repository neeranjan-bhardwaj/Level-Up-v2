import type{ Request, Response } from 'express';
import { GoogleGenAI} from "@google/genai";

const genAI = new GoogleGenAI({apiKey:'AIzaSyBIw0do3MFlZabQTNa_ISryw9dk4uon6Lw'}) ;
// const chat = model.startChat({
//     history: [
//     {
//         role: "user",
//         parts: [{ text: "Hello" }],
//     },
//     {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//     },
//     ],
// });

async function generateContent(query: string): Promise<string|undefined> {
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query,
        config:{
            systemInstruction:``
        }
    });
    return response.text;
}

export async function getRoadmap(req: Request, res: Response): Promise<void> {
    try{
        const user:string|undefined=res.locals.user
        const query:string = req.body.query;
        if(!query) throw 'can not find query in request body';
        console.log(query);
        const response = await generateContent(query);
        console.log(response);
        res.json({ message: response });
    }catch(err){
        if(err instanceof Error){
            res.json({ message: err.message });
            console.log(err.message);
        }
        if(typeof err === 'string'){
            res.json({ message: err });
            console.log(err);
        }
    }
}