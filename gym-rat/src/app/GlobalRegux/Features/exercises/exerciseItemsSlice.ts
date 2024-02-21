import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchExerciseItems = createAsyncThunk(
  "exercises/getAllItems",
  async (thunkApi) => {
    const response = await fetch("http://localhost:3000/api/exercises/items");
    const data = await response.json();
    console.log("fetchExerciseItems", data);
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
  value: 10,
} as any;

const exerciseItemsSlice = createSlice({
  name: "exerciseItems",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExerciseItems.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(fetchExerciseItems.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { increment } = exerciseItemsSlice.actions;

export default exerciseItemsSlice.reducer;
