const dotenv = require("dotenv");
const readline = require("readline");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

rl.question("Enter your prompt: ", async (userPrompt) => {
  try {
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7, // controls creativity
        topP: 0.9,        // nucleus sampling
        topK: 40          // limits token selection
      }
    });

    console.log("\n--- AI Response ---");
    console.log(response.response.text());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});
