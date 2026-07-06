const { validateCompany } = require("../utils/validateInput");
const { runResearchChain } = require("../services/researchService");

/**
 * POST /api/analyze
 * Accepts a company name and returns AI-generated investment research.
 */
const analyze = async (req, res) => {
  const { company } = req.body;

  // Validate input
  const validationError = validateCompany(company);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const result = await runResearchChain(company.trim());
    return res.status(200).json(result);
  } catch (err) {
    console.error("Analysis error:", err.message);
    return res.status(500).json({
      error: "Failed to analyze the company. Please try again.",
    });
  }
};

module.exports = { analyze };
