import { motion } from "framer-motion";

/**
 * Analysis metadata strip shown at the top of the result.
 * Props:
 *  - analysisTime: number (seconds, e.g. 2.1)
 */
const MetadataBar = ({ analysisTime }) => {
  const items = [
    { icon: "🤖", label: "Model", value: "Gemini 2.5 Flash" },
    {
      icon: "⚡",
      label: "Analysis Time",
      value: analysisTime ? `${analysisTime}s` : "—",
    },
    { icon: "🔗", label: "AI Powered", value: "LangChain + Gemini" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap justify-center sm:justify-start gap-3 mb-5"
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-surface-700 border border-surface-600 text-xs"
        >
          <span>{item.icon}</span>
          <span className="text-gray-500">{item.label}:</span>
          <span className="text-gray-300 font-medium">{item.value}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default MetadataBar;
