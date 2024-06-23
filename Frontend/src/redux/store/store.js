import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/loginReducer";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import memberReducer from "../reducer/memberReducer";
import tasksReducer from "../reducer/tasksReducer";

//Redux Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//Persited Reducers
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
const persistedMemberReducer = persistReducer(persistConfig, memberReducer);
const persistedTaskReducer = persistReducer(persistConfig, tasksReducer);

//Redux store with data persist
export const store = configureStore({
  reducer: {
    auth: persistedLoginReducer,
    member: persistedMemberReducer,
    task: persistedTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
