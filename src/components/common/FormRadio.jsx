import React from "react";

const FormRadio = ({ label, name, options, value, onChange }) => {
  return (
    <div className="space-y-4">
      {label && (
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                value === opt
                  ? "border-[#4A1D46] bg-[#4A1D46]"
                  : "border-gray-300"
              }`}
            >
              {value === opt && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span
              className={`text-sm font-semibold transition-colors ${
                value === opt
                  ? "text-[#4A1D46]"
                  : "text-gray-500 group-hover:text-gray-800"
              }`}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormRadio;
