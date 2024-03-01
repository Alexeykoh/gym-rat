"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/user/userSlice";
import workoutSlice from "./Features/workouts/workoutSlice";

export const store = configureStore({
  reducer: {
    workouts: workoutSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
