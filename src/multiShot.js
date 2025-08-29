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

rl.question("Enter your question or task: ", async (userInput) => {
  try {
    const multiShotPrompt = `
You are a highly intelligent assistant. Follow the examples below to answer user questions clearly and concisely.

Example 1: "What is the capital of France?" → "Paris"
Example 2: "Classify: A kangaroo" → "Marsupial"
Example 3: "Translate 'Hello' to Spanish" → "Hola"

Now answer this: "${userInput}"
`;

    const response = await model.generateContent(multiShotPrompt);

    console.log("\n--- Multi-Shot Response ---");
    console.log(response.response.text());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});
