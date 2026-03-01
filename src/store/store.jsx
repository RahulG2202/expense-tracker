import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expenseReducer from "@/store/slices/expenseSlice";
import expenseFormReducer from "@/store/slices/formSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  expenses: expenseReducer,
  expenseForm: expenseFormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
