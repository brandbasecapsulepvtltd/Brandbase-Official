import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC-ooQpN9eaZXy83ssVfNBnOyF2Wfki7ow" });

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "what is the table of 2",
    });
    console.log(response.text);
}

main();