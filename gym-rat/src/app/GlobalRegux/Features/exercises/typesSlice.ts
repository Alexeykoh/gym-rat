import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTypes = createAsyncThunk(
  "types/getAllTypes",
  async (thunkApi) => {
    const response = await fetch("http://localhost:3000/api/exercises/types");
    const data = await response.json();
    console.log("fetchTypes", data);
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
  value: 10,
} as any;

const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(fetchTypes.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { increment } = typesSlice.actions;

export default typesSlice.reducer;
