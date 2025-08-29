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

// System prompt (sets tone and behavior)
const systemPrompt = `
You are ButlerAI, a polite and helpful assistant like J.A.R.V.I.S.
Always respond in a professional and respectful tone.
`;

rl.question("Enter your prompt: ", async (userPrompt) => {
  try {
    const combinedPrompt = `${systemPrompt}\nUser: ${userPrompt}\nAssistant:`;

    const response = await model.generateContent(combinedPrompt);

    console.log("\n--- Response ---");
    console.log(response.response.text());

    console.log("\n--- Token Usage ---");
    console.log(response.response.usageMetadata);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});