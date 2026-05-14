import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../features/user/userSlice";
import productReducer from "../../features/product/productSlice";
import storage from "redux-persist/es/storage";
import { persistStore, persistReducer } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,

  whitelist: ["isAuthenticated", "user"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    product: productReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
