import React from "react";
import CommonModal from "@/components/common/Modal";

const ConsentModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmText = "Delete",
  variant = "danger",
}) => {
  const confirmStyles =
    variant === "danger"
      ? "bg-[#FF9F8E] hover:bg-red-500 shadow-red-100" // Coral/Red for danger
      : "bg-[#4A1D46] hover:opacity-90 shadow-purple-100"; // Purple for primary

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-sm"
    >
      <div className="text-center">
        <p className="text-gray-500 mb-8 leading-relaxed">
          {description ||
            "This action cannot be undone. Please confirm to proceed."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full py-4 rounded-2xl text-white font-bold transition-all active:scale-95 shadow-lg ${confirmStyles}`}
          >
            {confirmText}
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ConsentModal;
