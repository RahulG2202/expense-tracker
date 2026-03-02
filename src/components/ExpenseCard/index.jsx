//* package imports */
import { useState } from "react";
import clsx from "clsx";

//* Component imports */
import ConsentModal from "@/components/common/ConsentModal";

//* Utils imports */
import { useDispatch } from "react-redux";
import { openDetailModal } from "@/store/slices/formSlice";
import { deleteExpense } from "@/store/slices/expenseSlice";

const ExpenseCard = ({ expense, snapshot }) => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteExpense(expense.id));
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          dispatch(openDetailModal(expense));
        }}
        className={clsx(
          "bg-white p-5 rounded-2xl shadow-sm border border-transparent hover:border-purple-200 transition-all group cursor-pointer active:scale-[0.95]",
          snapshot.isDragging ? "shadow-2xl ring-2 ring-[#4A1D46]/20" : "",
        )}
      >
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-row w-full relative">
            <h4 className="font-bold text-gray-900 group-hover:text-[#4A1D46] transition-colors uppercase text-sm tracking-wider mr-5">
              {expense.title}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModalOpen(true);
              }}
              className="absolute -right-3 -top-3 bg-[#FF9F8E] p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400">{expense.category}</p>
          <strong className="font-bold text-2xl mt-2">₹{expense.amount}</strong>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            {new Date(expense.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {isDeleteModalOpen && (
        <ConsentModal
          isOpen={isDeleteModalOpen}
          onClose={(e) => {
            e.stopPropagation();
            setDeleteModalOpen(false);
          }}
          onConfirm={handleDelete}
          title="Delete Request?"
          description={`Are you sure you want to remove the funding request for "${expense.title}"?`}
        />
      )}
    </>
  );
};

export default ExpenseCard;
