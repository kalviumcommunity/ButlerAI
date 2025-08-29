const dotenv = require("dotenv");
const readline = require("readline");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

rl.question("Enter your prompt: ", async (userPrompt) => {
  try {
    // Combine "system tone" with user input
    const combinedPrompt = `You are a helpful assistant. Answer clearly and politely.\nUser request: ${userPrompt}`;

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
