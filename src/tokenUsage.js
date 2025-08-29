const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

(async () => {
  const text = "This is a test message to check token usage.";
  const response = await model.generateContent(text);

  console.log("Response:", response.response.text());
  console.log("Usage Info:", response.response.usageMetadata);
})();