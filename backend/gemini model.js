require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const gemini = async (text) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Extract the following from this resume text:
    - Name
    - Key technical skills (comma-separated)
    - Job preferences (one sentence)

    Return a **valid JSON** response exactly in this format:
    {"name" :"", "skills": [], "preferences": "" }

    Do NOT include any extra text, explanations, or code blocks like \`\`\`.
    
    Resume Text:
    ${text}
    `;


    const result = await model.generateContent(prompt);
    generatedJson = result.response.text();
    const cleanedJson=generatedJson.replace(/```json/g, "").replace(/```/g, "").trim();
    console.log("gemini"+result.response.text());
    const json=JSON.parse(cleanedJson);
    return json;
}

module.exports = gemini;