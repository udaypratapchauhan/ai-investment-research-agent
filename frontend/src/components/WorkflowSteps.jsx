import { motion } from "framer-motion";

const STEPS = [
  { icon: "🔍", label: "Research" },
  { icon: "📊", label: "Analysis" },
  { icon: "⚠️",  label: "Risk Assessment" },
  { icon: "💡", label: "Recommendation" },
  { icon: "📄", label: "Report" },
];

/**
 * Horizontal (desktop) / vertical (mobile) workflow pipeline.
 * Shows the 5-step AI analysis process.
 */
const WorkflowSteps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <p className="text-center text-xs uppercase tracking-widest text-gray-600 font-semibold mb-4">
        AI Analysis Pipeline
      </p>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="flex flex-col items-center gap-1.5 px-3"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-700 border border-surface-600
                flex items-center justify-center text-lg hover:border-accent/40 hover:bg-accent/5
                transition-all duration-200">
                {step.icon}
              </div>
              <span className="text-gray-500 text-xs font-medium whitespace-nowrap">
                {step.label}
              </span>
            </motion.div>

            {/* Arrow connector */}
            {idx < STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.4 }}
                className="text-surface-600 text-sm font-light pb-4"
              >
                ─→
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="sm:hidden flex items-center gap-0 overflow-x-auto pb-2 px-2 scrollbar-hide">
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-1 px-2">
              <div className="w-9 h-9 rounded-xl bg-surface-700 border border-surface-600
                flex items-center justify-center text-base">
                {step.icon}
              </div>
              <span className="text-gray-600 text-xs whitespace-nowrap">{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <span className="text-surface-600 text-xs pb-4 shrink-0">→</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkflowSteps;
