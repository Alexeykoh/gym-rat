"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../GlobalRegux/Features/user/userSlice";
import exerciseItemsSlice from "./Features/exercises/exerciseItemsSlice";
import typesSlice from "./Features/exercises/typesSlice";
import workoutsSlice from "./Features/workouts/workoutsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    types: typesSlice,
    exerciseItems: exerciseItemsSlice,
    workouts: workoutsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
