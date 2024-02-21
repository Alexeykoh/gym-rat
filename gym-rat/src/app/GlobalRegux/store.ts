"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../GlobalRegux/Features/user/userSlice";
import counterReducer from "./Features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
