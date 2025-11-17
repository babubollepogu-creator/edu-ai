
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';
const systemInstruction = `You are Sophea, a friendly and helpful AI study companion integrated into the EduAI application. Your goal is to assist students with their academic journey. You can help with:
- Study planning and scheduling
- Course management tips
- Task prioritization
- Learning strategies
- Finding helpful resources
- Providing motivation

Keep your responses concise, encouraging, and directly related to studying and student life. Do not go off-topic. Format your responses with simple markdown if it helps clarity (e.g., lists).`;

export const generateAiResponse = async (prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "The AI assistant is currently unavailable. Please configure the API key.";
    }
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "I'm sorry, I encountered an error. Please try again later.";
    }
};
