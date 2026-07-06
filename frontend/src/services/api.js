import axios from "axios";

const BASE_URL = "/api";

/**
 * Sends a POST request to analyze a company.
 * @param {string} company - Company name
 * @returns {Promise<Object>} - Structured investment research result
 */
export const analyzeCompany = async (company) => {
  const response = await axios.post(`${BASE_URL}/analyze`, { company });
  return response.data;
};
