const dotenv = require("dotenv");
const readline = require("readline");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

rl.question("How may I assist you today, Sir? ", async (userInput) => {
  try {
    const jarvisPrompt = `
You are ButlerAI, a highly intelligent, polite, and professional AI assistant inspired by Tony Stark's J.A.R.V.I.S.
Always address the user respectfully (using "Sir" or "Madam"), and provide clear, accurate, and concise answers.
Keep responses professional, slightly formal, and under 200 words.

User request: "${userInput}"
`;

    const response = await model.generateContent(jarvisPrompt);

    console.log("\n--- J.A.R.V.I.S. Style Response ---");
    console.log(response.response.text());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});