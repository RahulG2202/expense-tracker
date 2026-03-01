import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  filterCategory: "All",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({
        ...action.payload,
        id: Date.now(),
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload,
      );
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id,
      );
      if (index !== -1) {
        state.expenses[index] = {
          ...state.expenses[index],
          ...action.payload.updates,
        };
      }
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.expenses.findIndex((exp) => exp.id === id);
      if (index !== -1) {
        state.expenses[index].status = status;
      }
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  updateStatus,
  setFilterCategory,
} = expenseSlice.actions;
export const selectExpenses = (state) => state.expenses.expenses;
export default expenseSlice.reducer;
