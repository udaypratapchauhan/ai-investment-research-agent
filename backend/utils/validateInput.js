/**
 * Validates the company name from the request body.
 * @param {any} company - The value to validate
 * @returns {string|null} - Error message string, or null if valid
 */
const validateCompany = (company) => {
  if (!company || typeof company !== "string") {
    return "Company name is required.";
  }
  const trimmed = company.trim();
  if (trimmed.length === 0) {
    return "Company name cannot be empty.";
  }
  if (trimmed.length > 100) {
    return "Company name is too long (max 100 characters).";
  }
  return null;
};

module.exports = { validateCompany };
