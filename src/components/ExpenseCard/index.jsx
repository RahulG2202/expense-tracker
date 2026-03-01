//* Utils imports */
import { useDispatch } from "react-redux";
import { deleteExpense } from "@/store/slices/expenseSlice";
import clsx from "clsx";

const ExpenseCard = ({ expense, snapshot }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        "bg-white p-5 rounded-2xl shadow-sm border border-transparent hover:border-purple-200 transition-all group",
        snapshot.isDragging ? "shadow-2xl ring-2 ring-[#4A1D46]/20" : "",
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-900 group-hover:text-[#4A1D46] transition-colors uppercase text-sm tracking-wider">
            {expense.title}
          </h4>
          <p className="text-xs text-gray-400 mt-1">{expense.category}</p>
        </div>
        <span className="font-bold text-lg">₹{expense.amount}</span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
          {new Date(expense.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => dispatch(deleteExpense(expense.id))}
          className="bg-[#FF9F8E] p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
    </div>
  );
};

export default ExpenseCard;
