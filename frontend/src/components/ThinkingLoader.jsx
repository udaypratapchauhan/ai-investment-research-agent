import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { icon: "🔍", label: "Researching Company..." },
  { icon: "📊", label: "Analyzing Business Model..." },
  { icon: "⚠️",  label: "Evaluating Risks..." },
  { icon: "📈", label: "Calculating Investment Score..." },
  { icon: "🤖", label: "Generating AI Report..." },
];

const STEP_DURATION = 1800; // ms per step

/**
 * Animated AI thinking loader that walks through analysis steps one by one.
 */
const ThinkingLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentStep < STEPS.length - 1) {
      const t = setTimeout(() => setCurrentStep((s) => s + 1), STEP_DURATION);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), STEP_DURATION);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto mt-10"
      role="status"
      aria-label="AI analysis in progress"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-2xl"
          >
            🤖
          </motion.span>
        </div>
        <p className="text-white font-semibold text-lg">
          {done ? "✅ Analysis Complete" : "AI is thinking…"}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {done ? "Preparing your report" : "Powered by Gemini 2.5 Flash"}
        </p>
      </div>

      {/* Step list */}
      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep || done;
          const isActive = idx === currentStep && !done;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: idx <= currentStep || done ? 1 : 0.25, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300
                ${isActive
                  ? "bg-accent/10 border-accent/30"
                  : isCompleted
                  ? "bg-surface-700 border-surface-600"
                  : "bg-surface-800 border-surface-700"
                }`}
            >
              {/* Status icon */}
              <span className="text-lg w-7 text-center shrink-0">
                {isCompleted ? "✅" : isActive ? step.icon : step.icon}
              </span>

              {/* Label */}
              <span
                className={`text-sm font-medium flex-1 ${
                  isActive ? "text-white" : isCompleted ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>

              {/* Active pulse dot */}
              {isActive && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  className="w-2 h-2 rounded-full bg-accent shrink-0"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <div className="mt-6 h-1.5 bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: done
              ? "100%"
              : `${((currentStep + 1) / STEPS.length) * 95}%`,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default ThinkingLoader;
