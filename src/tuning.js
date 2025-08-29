const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

(async () => {
  try {
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Write a short story about space travel" }] }],
      generationConfig: {
        temperature: 0.7, 
        topP: 0.9,
        topK: 40
      }
    });

    console.log("\n--- Tuning Parameters Response ---");
    console.log(response.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
})();