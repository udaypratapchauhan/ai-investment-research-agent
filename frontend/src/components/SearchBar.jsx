import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Search bar with input + analyze button.
 * Props:
 *  - onSubmit(company: string): void
 *  - loading: boolean
 *  - prefill: string | null  — sets the input value externally (from EmptyState chips)
 */
const SearchBar = ({ onSubmit, loading, prefill }) => {
  const [company, setCompany] = useState("");
  const [validationError, setValidationError] = useState("");

  // Fill input when user clicks an example chip in EmptyState
  useEffect(() => {
    if (prefill) {
      setCompany(prefill);
      setValidationError("");
    }
  }, [prefill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim()) {
      setValidationError("Please enter a company name.");
      return;
    }
    setValidationError("");
    onSubmit(company.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.15 }}
            id="company-input"
            type="text"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              if (validationError) setValidationError("");
            }}
            placeholder="Enter company name (e.g. Tesla, Apple…)"
            disabled={loading}
            className={`w-full px-5 py-3.5 rounded-xl bg-surface-700 border text-white
              placeholder-gray-500 text-sm outline-none transition-all duration-200
              focus:ring-2 focus:ring-accent/60 focus:border-accent/60
              ${validationError ? "border-red-500" : "border-surface-600"}
              disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          {validationError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-red-400 text-xs"
            >
              {validationError}
            </motion.p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          id="analyze-btn"
          type="submit"
          disabled={loading}
          className="px-7 py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-medium
            text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-accent/60 whitespace-nowrap
            shadow-lg shadow-accent/20 hover:shadow-accent/40"
        >
          {loading ? "Analyzing…" : "Analyze"}
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;
