const { buildResearchChain } = require("../langchain/chain");

/**
 * Runs the LangChain research pipeline for the given company.
 * @param {string} company - The company name to analyze
 * @returns {Promise<Object>} - Structured investment research result
 */
const runResearchChain = async (company) => {
  const chain = buildResearchChain();
  const result = await chain.invoke({ company });
  return result;
};

module.exports = { runResearchChain };
