const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input
rl.question("Enter your text: ", async (text) => {
  try {
    const response = await model.generateContent(text);

    // AI Response
    console.log("\nResponse:", response.response.text());

    // Token Usage Info
    const usage = response.response.usageMetadata;
    console.log("\nToken Usage Info:");
    console.log(`Prompt Tokens: ${usage.promptTokenCount}`);
    console.log(`Candidates Tokens: ${usage.candidatesTokenCount}`);
    console.log(`Total Tokens: ${usage.totalTokenCount}`);
  } catch (error) {
    console.error("Error generating content:", error);
  } finally {
    rl.close();
  }
});
