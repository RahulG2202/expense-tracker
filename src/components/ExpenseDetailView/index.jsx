import React from "react";
import { useDispatch } from "react-redux";
import { switchToEditMode } from "@/store/slices/formSlice";

const DetailRow = ({ label, value, isAmount = false }) => (
  <div className="border-b border-purple-50 py-4">
    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
      {label}
    </p>
    <p
      className={
        isAmount
          ? "text-3xl font-bold text-[#4A1D46]"
          : "text-lg font-semibold text-gray-800"
      }
    >
      {isAmount ? `₹ ${Number(value).toLocaleString()}` : value}
    </p>
  </div>
);

const ExpenseDetailView = ({ expense }) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-2">
      <div className="bg-[#F7F2F6] p-6 rounded-4xl mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-[#4A1D46] uppercase tracking-tighter">
            Status
          </p>
          <span className="inline-block mt-1 px-4 py-1 rounded-full bg-white text-[#4A1D46] font-bold text-sm shadow-sm">
            {expense.status}
          </span>
        </div>
        <button
          onClick={() => dispatch(switchToEditMode())}
          className="bg-[#4A1D46] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
        >
          Edit Expense
        </button>
      </div>

      <DetailRow label="Expense Title" value={expense.title} />
      <DetailRow label="Community Partner" value={expense.partnershipName} />

      <div className="grid grid-cols-2 gap-4">
        <DetailRow label="Department" value={expense.department} />
        <DetailRow label="Category" value={expense.category} />
      </div>

      <DetailRow label="Requested Amount" value={expense.amount} isAmount />

      <div className="pt-4">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
          Description
        </p>
        <div className="bg-gray-50 p-5 rounded-2xl text-gray-600 leading-relaxed text-sm italic">
          "{expense.description || "No description provided."}"
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailView;
