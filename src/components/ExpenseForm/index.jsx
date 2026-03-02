//* Package imports */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

//* Component imports */
import FormField from "@/components/common/FormField";
import FormSelect from "@/components/common/FormSelect";

//* Utils imports */
import { CATEGORIES, DEPARTMENTS } from "@/utils/constants";
import { closeExpenseFormModal } from "@/store/slices/formSlice";
import { addExpense, updateExpense } from "@/store/slices/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { editingExpense } = useSelector((state) => state.expenseForm);

  const [formData, setFormData] = useState({
    title: editingExpense?.title || "",
    partnershipName: editingExpense?.partnershipName || "",
    department: editingExpense?.department || DEPARTMENTS[0],
    category: editingExpense?.category || CATEGORIES[0],
    amount: editingExpense?.amount || "",
    description: editingExpense?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim())
      return toast.error("Activity Title is required!");
    if (!formData.partnershipName.trim())
      return toast.error("Partnership Name is required!");

    const amountNum = Number(formData.amount);
    if (!Number.isInteger(amountNum) || amountNum <= 0) {
      return toast.error("Amount must be a whole number (Integer)!");
    }

    if (editingExpense) {
      dispatch(updateExpense({ ...formData, id: editingExpense.id }));
      toast.info("Funding request updated.");
    } else {
      dispatch(addExpense(formData));
      toast.success("New funding request submitted!");
    }

    dispatch(closeExpenseFormModal());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[70vh] overflow-y-auto px-2 custom-scrollbar"
    >
      <FormField
        label="Activity Title"
        placeholder="e.g., Annual STEM Workshop"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <FormField
        label="Community Partner"
        placeholder="e.g., Phoenix Public Library"
        value={formData.partnershipName}
        onChange={(e) =>
          setFormData({ ...formData, partnershipName: e.target.value })
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="University Department"
          options={DEPARTMENTS}
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />

        <FormSelect
          label="Funding Category"
          options={CATEGORIES}
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div>

      <FormField
        label="Requested Amount (₹)"
        type="number"
        placeholder="0"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />

      <FormField
        as="textarea"
        label="Justification / Description"
        placeholder="How does this funding support the partnership goals?"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <button
        type="submit"
        className="w-full bg-[#4A1D46] text-white py-4 rounded-2xl font-bold shadow-lg hover:opacity-95 active:scale-[0.98] transition-all mt-4"
      >
        {editingExpense ? "Update Expense" : "Submit Funding Request"}
      </button>
    </form>
  );
};

export default ExpenseForm;
