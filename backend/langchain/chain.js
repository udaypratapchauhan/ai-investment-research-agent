const { GoogleGenAI } = require("@google/genai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence, RunnableLambda } = require("@langchain/core/runnables");

// The prompt instructs Gemini to research the company and return valid JSON
const RESEARCH_PROMPT = `You are an expert investment analyst. Research the company "{company}" and provide a thorough investment analysis.

Return ONLY a valid JSON object with exactly this structure (no markdown, no code fences, just raw JSON):

{{
  "company": "<company name>",
  "overview": "<2-3 sentence company overview>",
  "industry": "<industry/sector>",
  "businessModel": "<brief description of how the company makes money>",
  "strengths": [
    "<competitive advantage 1>",
    "<competitive advantage 2>",
    "<competitive advantage 3>"
  ],
  "risks": [
    "<major risk 1>",
    "<major risk 2>",
    "<major risk 3>"
  ],
  "recentTrends": "<notable recent developments or trends>",
  "growthOpportunities": "<key growth opportunities>",
  "recommendation": "Invest" or "Pass",
  "confidence": "<percentage, e.g. 72%>",
  "reasoning": "<3-4 sentences explaining the recommendation and confidence level>"
}}

Important: respond with raw JSON only. No explanations outside the JSON.`;

/**
 * Calls Gemini via the new @google/genai SDK (supports AQ... keys from AI Studio).
 * @param {string} promptText - The fully-formatted prompt string
 * @returns {Promise<string>} - Raw text response from Gemini
 */
const callGemini = async (promptText) => {
  console.log("Gemini Key:", process.env.GEMINI_API_KEY);
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promptText,
  });

  return response.text;
};

/**
 * Builds and returns the LangChain research chain.
 *
 * Pipeline:
 *   PromptTemplate → format prompt string
 *   → RunnableLambda (calls Gemini via @google/genai)
 *   → RunnableLambda (strips markdown fences + JSON.parse)
 */
const buildResearchChain = () => {
  const prompt = PromptTemplate.fromTemplate(RESEARCH_PROMPT);

  // Step 1: Format the PromptTemplate into a plain string
  const formatPrompt = new RunnableLambda({
    func: async (input) => {
      const formatted = await prompt.format(input);
      return formatted;
    },
  });

  // Step 2: Call Gemini and return raw text
  const geminiStep = new RunnableLambda({
    func: async (promptText) => {
      return await callGemini(promptText);
    },
  });

  // Step 3: Clean up any accidental markdown fences and parse JSON
  const parseJson = new RunnableLambda({
    func: (text) => {
      const cleaned = text
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "");
      return JSON.parse(cleaned);
    },
  });

  return RunnableSequence.from([formatPrompt, geminiStep, parseJson]);
};

module.exports = { buildResearchChain };
