import React from "react";

const FormCheckbox = ({ label, checked, onChange, ...props }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked ? "border-[#4A1D46] bg-[#4A1D46]" : "border-gray-300 bg-white"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-sm font-semibold text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default FormCheckbox;
