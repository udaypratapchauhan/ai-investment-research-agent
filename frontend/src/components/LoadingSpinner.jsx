/**
 * Animated loading spinner with a status message.
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16" role="status" aria-label="Analyzing">
      {/* Spinner ring */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-surface-600" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin" />
      </div>

      <div className="text-center">
        <p className="text-white font-medium">Analyzing with AI…</p>
        <p className="text-gray-500 text-sm mt-1">
          Researching the company via Gemini. This may take a moment.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
