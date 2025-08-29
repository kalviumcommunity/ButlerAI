const dotenv = require("dotenv");
const readline = require("readline");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your prompt: ", async (userPrompt) => {
  try {
    const response = await model.generateContent(userPrompt);

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
