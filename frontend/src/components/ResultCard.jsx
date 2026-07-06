import { motion } from "framer-motion";
import RecommendationBadge from "./RecommendationBadge";
import ScoreCard from "./ScoreCard";
import MetadataBar from "./MetadataBar";

// Stagger container for child cards
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * SectionCard — a titled card with icon used for every report section.
 */
const SectionCard = ({ icon, title, children, className = "" }) => (
  <motion.div
    variants={cardVariant}
    className={`bg-surface-700 rounded-2xl border border-surface-600 p-5 ${className}`}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-base">{icon}</span>
      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
        {title}
      </h3>
    </div>
    {children}
  </motion.div>
);

/**
 * ResultCard — full premium AI research report card.
 *
 * Props:
 *  - data: { company, overview, industry, businessModel,
 *            strengths[], risks[], recentTrends, growthOpportunities,
 *            recommendation, confidence, reasoning }
 *  - analysisTime: number | null (seconds)
 */
const ResultCard = ({ data, analysisTime }) => {
  const isInvest = data.recommendation?.toLowerCase() === "invest";

  return (
    <motion.div
      id="result-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto mt-4"
    >
      {/* ── Metadata strip ── */}
      <MetadataBar analysisTime={analysisTime} />

      {/* ── Company header ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl border p-6 mb-4 flex flex-col sm:flex-row sm:items-center
          sm:justify-between gap-4
          ${isInvest
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-red-500/5 border-red-500/20"
          }`}
      >
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-1">
            AI Investment Report
          </p>
          <h2 className="text-2xl font-bold text-white">{data.company}</h2>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md bg-surface-700
            border border-surface-600 text-gray-400 text-xs">
            {data.industry}
          </span>
        </div>

        {/* Premium badge */}
        <div className="flex flex-col items-start sm:items-end gap-2">
          <RecommendationBadge
            recommendation={data.recommendation}
            confidence={data.confidence}
            size="lg"
          />
        </div>
      </motion.div>

      {/* ── All report sections ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {/* Score card */}
        <motion.div variants={cardVariant}>
          <ScoreCard confidence={data.confidence} />
        </motion.div>

        {/* Company Overview */}
        <SectionCard icon="🏢" title="Company Overview">
          <p className="text-gray-300 text-sm leading-relaxed">{data.overview}</p>
        </SectionCard>

        {/* Business Model */}
        {data.businessModel && (
          <SectionCard icon="💼" title="Business Model">
            <p className="text-gray-300 text-sm leading-relaxed">{data.businessModel}</p>
          </SectionCard>
        )}

        {/* Strengths & Risks side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionCard icon="💪" title="Strengths" className="h-full">
            <ul className="space-y-2.5">
              {data.strengths?.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.5 }}
                  className="flex items-start gap-2.5 text-sm text-gray-300"
                >
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-500/20
                    border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs">
                    ✓
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard icon="⚠️" title="Risks" className="h-full">
            <ul className="space-y-2.5">
              {data.risks?.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.5 }}
                  className="flex items-start gap-2.5 text-sm text-gray-300"
                >
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-red-500/20
                    border border-red-500/40 flex items-center justify-center text-red-400 text-xs">
                    ✕
                  </span>
                  {r}
                </motion.li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* Recent Trends */}
        {data.recentTrends && (
          <SectionCard icon="📰" title="Recent Trends">
            <p className="text-gray-300 text-sm leading-relaxed">{data.recentTrends}</p>
          </SectionCard>
        )}

        {/* Growth Opportunities */}
        {data.growthOpportunities && (
          <SectionCard icon="🚀" title="Growth Opportunities">
            <p className="text-gray-300 text-sm leading-relaxed">{data.growthOpportunities}</p>
          </SectionCard>
        )}

        {/* Investment Decision — highlighted */}
        <motion.div
          variants={cardVariant}
          className={`rounded-2xl border p-5
            ${isInvest
              ? "bg-emerald-500/8 border-emerald-500/25"
              : "bg-red-500/8 border-red-500/25"
            }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🏆</span>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              Investment Decision
            </h3>
          </div>
          <RecommendationBadge
            recommendation={data.recommendation}
            confidence={data.confidence}
            size="lg"
          />
        </motion.div>

        {/* AI Reasoning */}
        <motion.div
          variants={cardVariant}
          className="bg-surface-700 rounded-2xl border border-accent/20 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🤖</span>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              AI Reasoning
            </h3>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">{data.reasoning}</p>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-xs pb-4">
          ⚠️ This is AI-generated analysis and not financial advice. Always do your own research.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;
