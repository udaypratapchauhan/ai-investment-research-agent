/**
 * Displays a styled error message.
 * Props:
 *  - message: string
 */
const ErrorMessage = ({ message }) => {
  return (
    <div
      role="alert"
      className="w-full max-w-xl mx-auto mt-6 px-5 py-4 rounded-xl
        bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
    >
      <span className="font-semibold">Error: </span>
      {message}
    </div>
  );
};

export default ErrorMessage;
