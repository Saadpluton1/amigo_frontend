import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/userSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import trackReducer from "./slices/trackSlice"

const reducers = combineReducers({
  user: userReducers,
  track : trackReducer
});
const persistConfig = {
  key: "user",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
