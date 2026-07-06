import { motion } from "framer-motion";

const EXAMPLES = ["Tesla", "Apple", "NVIDIA", "Microsoft", "Amazon"];

/**
 * Beautiful empty state shown before the user performs any search.
 * Props:
 *  - onExample(company: string): void  — called when user clicks an example chip
 */
const EmptyState = ({ onExample }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto mt-12 text-center"
    >
      {/* Illustration card */}
      <div className="relative mx-auto w-fit mb-8">
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-2xl scale-110" />
        <div className="relative bg-surface-800 border border-surface-600 rounded-3xl p-8 sm:p-10">
          {/* Icon grid */}
          <div className="grid grid-cols-3 gap-3 mb-6 max-w-[200px] mx-auto">
            {["📊", "🔍", "📈", "🤖", "💡", "📄"].map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                className="w-12 h-12 rounded-xl bg-surface-700 border border-surface-600
                  flex items-center justify-center text-xl"
              >
                {icon}
              </motion.div>
            ))}
          </div>

          <h2 className="text-white font-semibold text-lg mb-2">
            AI Investment Research, Instantly
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Enter a company name above to generate an AI-powered investment report
            with strengths, risks, and a clear recommendation.
          </p>
        </div>
      </div>

      {/* Example chips */}
      <p className="text-gray-600 text-xs uppercase tracking-widest font-medium mb-3">
        Try an example
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((company) => (
          <motion.button
            key={company}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onExample(company)}
            className="px-4 py-2 rounded-full bg-surface-700 border border-surface-600
              text-gray-300 text-sm hover:border-accent/50 hover:text-white
              hover:bg-accent/5 transition-all duration-200"
          >
            {company}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;
