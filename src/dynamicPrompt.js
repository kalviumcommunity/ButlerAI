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

rl.question("Ask me a question: ", async (userQuestion) => {
  try {
    const dynamicPrompt = `Answer the following question in 3 bullet points:\n${userQuestion}`;

    const response = await model.generateContent(dynamicPrompt);

    console.log("\n--- Dynamic Prompt Response ---");
    console.log(response.response.text());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});
