import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  filterCategory: "All",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
});

export const selectExpenses = (state) => state.expenses.expenses;
export default expenseSlice.reducer;
