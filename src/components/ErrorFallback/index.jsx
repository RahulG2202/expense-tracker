const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-100 flex flex-col items-center justify-center p-6 text-center bg-red-50 rounded-xl border-2 border-red-100 my-10">
      <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-red-600 font-mono text-sm mb-6 max-w-md bg-white p-3 rounded border border-red-200">
        {error.message}
      </p>
      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-white text-gray-600 border border-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
