// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../searchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
