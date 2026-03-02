//* Package imports */
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

//* Component imports */
import Modal from "@/components/common/Modal";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseDetailView from "@/components/ExpenseDetailView";

//* Utils imports */
import {
  openAddExpenseModal,
  closeExpenseFormModal,
  closeDetailModal,
} from "@/store/slices/formSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const {
    isAddExpenseModalOpen,
    isDetailModalOpen,
    viewingExpense,
    editingExpense,
  } = useSelector((state) => state.expenseForm);

  return (
    <div className="min-h-screen bg-[#F7F2F6] flex flex-col font-sans">
      <header className="bg-white border-b border-purple-100 py-5 px-8 sticky top-0 z-50 shadow-sm">
        <div className="max-w-350 mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-[#4A1D46] flex items-center gap-2 transition-transform active:scale-95"
          >
            <span className="bg-[#4A1D46] text-white px-3 py-1 rounded-lg">
              E
            </span>
            Expense Tracker
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-500 hover:text-[#4A1D46] font-semibold px-3 py-2 transition-colors"
            >
              Dashboard
            </Link>
            <button
              className="bg-[#4A1D46] text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition-all font-bold shadow-md active:scale-95"
              onClick={() => dispatch(openAddExpenseModal())}
            >
              + New Expense
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-350 mx-auto w-full p-8 lg:p-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-purple-100 py-8 text-center text-gray-400 text-sm font-medium">
        Collaboratory Partnership Tracker | Spring 2026
      </footer>

      {isDetailModalOpen && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => dispatch(closeDetailModal())}
          title="Expense Details"
          maxWidth="max-w-lg"
        >
          <ExpenseDetailView expense={viewingExpense} />
        </Modal>
      )}

      {isAddExpenseModalOpen && (
        <Modal
          isOpen={isAddExpenseModalOpen}
          onClose={() => dispatch(closeExpenseFormModal())}
          title={editingExpense ? "Edit Expense" : "Add New Expense"}
          maxWidth="max-w-lg"
        >
          <ExpenseForm key={editingExpense?.id || "new-expense"} />
        </Modal>
      )}
    </div>
  );
};

export default Layout;
