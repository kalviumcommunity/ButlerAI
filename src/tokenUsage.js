const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

(async () => {
  try {
    const text = "This is a test message to check token usage.";
    const response = await model.generateContent(text);

    // AI Response
    console.log("Response:", response.response.text());

    // Token Usage Info
    const usage = response.response.usageMetadata;
    console.log("Usage Info:", usage);
    console.log(`Prompt Tokens: ${usage.promptTokenCount}`);
    console.log(`Candidates Tokens: ${usage.candidatesTokenCount}`);
    console.log(`Total Tokens: ${usage.totalTokenCount}`);
  } catch (error) {
    console.error("Error generating content:", error);
  }
})();
