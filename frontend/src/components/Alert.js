import { useEffect } from "react";

function Alert({ message, type, clearAlert }) {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        clearAlert(); // This clears the alert after 3 seconds
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message, clearAlert]);

  if (!message) return null;

  return (
    <div className="alert flex items-center justify-center mt-2">
      <div className="w-64 p-3 text-sm text-amber-500 rounded-lg bg-amber-50 dark:bg-neutral-700 dark:text-amber-400" role="alert">
        <span className="font-medium">{type}!</span> {message}
      </div>
    </div>
  );
}

export default Alert;
