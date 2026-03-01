import React from "react";

const FormSelect = ({ label, options, error, ...props }) => {
  return (
    <div className="w-full space-y-1 group">
      {label && (
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-[#4A1D46]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          className="w-full py-2 border-b-2 border-purple-100 bg-transparent focus:border-[#4A1D46] outline-none font-medium cursor-pointer appearance-none text-gray-700"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-3 pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-[10px] text-red-500 font-bold uppercase">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
