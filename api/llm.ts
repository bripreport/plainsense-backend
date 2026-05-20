import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export default async (request: VercelRequest, response: VercelResponse) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if(request.method === "OPTIONS"){
        return response.status(200).end();
    }

    try{
        const {message }= typeof request.body === "string" ? JSON.parse(request.body) : request.body;
        const completion = await openai.chat.completions.create({
             model: "gpt-4.1-mini",
            messages: [{ role: "user", content: message }],
        });

        response.status(200).json({ message: completion.choices[0].message.content });

    } 
    catch(error: any){
        response.status(500).json({error: error.message});
    };
};

