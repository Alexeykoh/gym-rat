import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
  value: 10,
} as any;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { increment } = userSlice.actions;

export default userSlice.reducer;
