"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
  role: "user",
};

export const userReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    save: (state, action) => {
      const { id, email, name, role } = action.payload;
      console.log("userReducer", id, email, name, role);
      state.id = id;
      state.email = email;
      state.name = name;
      state.role = role;
    },
  },
});

export const { save } = userReducer.actions;

export default userReducer.reducer;
