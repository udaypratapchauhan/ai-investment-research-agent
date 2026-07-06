import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ThinkingLoader from "../components/ThinkingLoader";
import ErrorMessage from "../components/ErrorMessage";
import ResultCard from "../components/ResultCard";
import WorkflowSteps from "../components/WorkflowSteps";
import EmptyState from "../components/EmptyState";
import useAnalyze from "../hooks/useAnalyze";

const Home = () => {
  const { loading, result, error, analysisTime, analyze } = useAnalyze();

  // Tracks the prefill value from EmptyState example chips
  const [prefill, setPrefill] = useState(null);

  // Called from EmptyState chip → fills input AND triggers analyze
  const handleExample = (company) => {
    setPrefill(company);
    // Small delay so the input visually fills before the request fires
    setTimeout(() => analyze(company), 80);
  };

  const showEmpty = !loading && !result && !error;
  const showWorkflow = result && !loading;

  return (
    <main className="min-h-screen px-4 py-14 sm:py-20 flex flex-col items-center">
      {/* ── Hero header ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        {/* Logo icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
          bg-accent/10 border border-accent/20 mb-5">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-accent-light"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.5 4.5L21 6.75M21 6.75H15m6 0v6"
            />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          AI Investment{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-purple-400">
            Research Agent
          </span>
        </h1>
        <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Enter any company name and get an AI-powered investment analysis in seconds.
        </p>
      </motion.header>

      {/* ── Search bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-xl"
      >
        <SearchBar onSubmit={analyze} loading={loading} prefill={prefill} />
      </motion.div>

      {/* ── Dynamic content area ── */}
      <AnimatePresence mode="wait">
        {/* Loading — AI thinking */}
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl"
          >
            <ThinkingLoader />
          </motion.div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl"
          >
            <ErrorMessage message={error} />
          </motion.div>
        )}

        {/* Empty state */}
        {showEmpty && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <EmptyState onExample={handleExample} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result (not inside AnimatePresence to avoid unmounting on re-analyze) */}
      {showWorkflow && (
        <div className="w-full max-w-3xl mt-10">
          <WorkflowSteps />
          <ResultCard data={result} analysisTime={analysisTime} />
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="mt-16 text-gray-600 text-xs text-center">
        Powered by LangChain · Google Gemini · Not financial advice.
      </footer>
    </main>
  );
};

export default Home;
