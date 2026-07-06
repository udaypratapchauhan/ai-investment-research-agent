import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Parses "72%" or "72" → 72 */
const parseScore = (confidence) => {
  const n = parseInt(String(confidence).replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? 50 : Math.min(n, 100);
};

/** Returns the colour class for a score value */
const scoreColor = (score) => {
  if (score >= 70) return "from-emerald-500 to-green-400";
  if (score >= 50) return "from-yellow-500 to-amber-400";
  return "from-red-500 to-rose-400";
};

const scoreTextColor = (score) => {
  if (score >= 70) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

/**
 * Animated score card.
 * Props:
 *  - confidence: string e.g. "72%"
 */
const ScoreCard = ({ confidence }) => {
  const score = parseScore(confidence);
  const [displayed, setDisplayed] = useState(0);

  // Count-up animation for the number
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(score / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        setDisplayed(score);
        clearInterval(interval);
      } else {
        setDisplayed(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Investment Score */}
      <div className="bg-surface-700 rounded-2xl border border-surface-600 p-5">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          Investment Score
        </p>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-4xl font-bold tabular-nums ${scoreTextColor(score)}`}>
            {displayed}
          </span>
          <span className="text-gray-500 text-lg mb-1">/ 100</span>
        </div>

        {/* Animated progress bar */}
        <div className="h-2 bg-surface-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className={`h-full rounded-full bg-gradient-to-r ${scoreColor(score)}`}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-gray-600 text-xs">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* Confidence */}
      <div className="bg-surface-700 rounded-2xl border border-surface-600 p-5">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          AI Confidence
        </p>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-4xl font-bold tabular-nums ${scoreTextColor(score)}`}>
            {confidence}
          </span>
        </div>
        {/* Radial-style dots */}
        <div className="flex gap-1 flex-wrap mt-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: i < Math.round(score / 10) ? 1 : 0.2 }}
              transition={{ delay: 0.05 * i + 0.3, duration: 0.25 }}
              className={`w-5 h-2 rounded-full ${
                i < Math.round(score / 10)
                  ? `bg-gradient-to-r ${scoreColor(score)}`
                  : "bg-surface-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
