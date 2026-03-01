import React from "react";
import { clsx } from "clsx";

const FormField = ({ label, error, as = "input", ...props }) => {
  const Component = as; // 'input' or 'textarea'

  return (
    <div className="w-full space-y-1 group">
      {label && (
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-[#4A1D46] transition-colors">
          {label}
        </label>
      )}

      <Component
        {...props}
        className={clsx(
          "w-full bg-transparent outline-none transition-all",
          as === "input" &&
            "py-2 border-b-2 border-purple-100 focus:border-[#4A1D46] text-lg font-semibold",
          as === "textarea" &&
            "p-4 bg-[#F7F2F6] rounded-2xl focus:ring-2 focus:ring-[#4A1D46]/20 min-h-25 resize-none text-sm",
          error ? "border-red-400 focus:border-red-500" : "",
        )}
      />

      {error && (
        <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
