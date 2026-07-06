import { motion } from "framer-motion";

/**
 * Derives the badge tier from recommendation + confidence.
 *
 * "Invest" + confidence >= 70%  → Strong Buy  (green)
 * "Invest" + confidence < 70%   → Moderate Buy (yellow)
 * "Pass"                        → Pass         (red)
 */
const getBadge = (recommendation, confidence) => {
  const score = parseInt(String(confidence).replace(/[^0-9]/g, ""), 10) || 50;
  const isInvest = recommendation?.toLowerCase() === "invest";

  if (isInvest && score >= 70) {
    return {
      label: "Strong Buy",
      emoji: "🟢",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      glow: "shadow-emerald-500/20",
    };
  }
  if (isInvest) {
    return {
      label: "Moderate Buy",
      emoji: "🟡",
      color: "text-yellow-400",
      border: "border-yellow-500/40",
      bg: "bg-yellow-500/10",
      glow: "shadow-yellow-500/20",
    };
  }
  return {
    label: "Pass",
    emoji: "🔴",
    color: "text-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    glow: "shadow-red-500/20",
  };
};

/**
 * Props:
 *  - recommendation: "Invest" | "Pass"
 *  - confidence: string e.g. "72%"
 *  - size: "sm" | "lg" (default "sm")
 */
const RecommendationBadge = ({ recommendation, confidence, size = "sm" }) => {
  const badge = getBadge(recommendation, confidence);

  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`inline-flex items-center gap-2 rounded-full border font-semibold shadow-lg
        ${badge.bg} ${badge.border} ${badge.color} ${badge.glow}
        ${size === "lg"
          ? "px-5 py-2.5 text-base"
          : "px-3.5 py-1.5 text-sm"
        }`}
    >
      <span>{badge.emoji}</span>
      {badge.label}
    </motion.span>
  );
};

export { getBadge };
export default RecommendationBadge;
