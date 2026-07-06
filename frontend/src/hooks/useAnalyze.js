import { useState } from "react";
import { analyzeCompany } from "../services/api";

/**
 * Custom hook that manages the full analyze flow:
 * loading state, result state, error state, and analysis timing.
 */
const useAnalyze = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(null);

  const analyze = async (company) => {
    setLoading(true);
    setResult(null);
    setError(null);
    setAnalysisTime(null);

    const startTime = performance.now();

    try {
      const data = await analyzeCompany(company);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
      setAnalysisTime(elapsed);
      setResult(data);
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, analysisTime, analyze };
};

export default useAnalyze;
