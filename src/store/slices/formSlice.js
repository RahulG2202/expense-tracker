import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddExpenseModalOpen: false,
  editingExpense: null,
};

const formSlice = createSlice({
  name: "expenseForm",
  initialState,
  reducers: {
    openAddExpenseModal: (state) => {
      state.isAddExpenseModalOpen = true;
      state.editingExpense = null;
    },
    openEditExpenseModal: (state, action) => {
      state.isAddExpenseModalOpen = true;
      state.editingExpense = action.payload;
    },
    closeExpenseFormModal: (state) => {
      state.isAddExpenseModalOpen = false;
      state.editingExpense = null;
    },
  },
});

export const {
  openAddExpenseModal,
  openEditExpenseModal,
  closeExpenseFormModal,
} = formSlice.actions;

export default formSlice.reducer;
