import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-[#4A1D46]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={clsx(
          "relative bg-white w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300",
          "rounded-[2.5rem] overflow-hidden",
          maxWidth,
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-8 pt-8 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-8">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
