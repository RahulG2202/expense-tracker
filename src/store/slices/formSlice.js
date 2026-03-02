import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddExpenseModalOpen: false,
  isDetailModalOpen: false,
  editingExpense: null,
  viewingExpense: null,
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
    openDetailModal: (state, action) => {
      state.isDetailModalOpen = true;
      state.viewingExpense = action.payload;
    },
    closeDetailModal: (state) => {
      state.isDetailModalOpen = false;
      state.viewingExpense = null;
    },
    switchToEditMode: (state) => {
      state.editingExpense = state.viewingExpense;
      state.isAddExpenseModalOpen = true;
      state.isDetailModalOpen = false;
    },
  },
});

export const {
  openAddExpenseModal,
  openEditExpenseModal,
  closeExpenseFormModal,
  openDetailModal,
  closeDetailModal,
  switchToEditMode,
} = formSlice.actions;

export default formSlice.reducer;
