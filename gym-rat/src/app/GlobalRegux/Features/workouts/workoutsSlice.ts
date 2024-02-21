import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const workouts = createAsyncThunk(
  "workouts/getAllWorkouts",
  async (page) => {
    const response = await fetch(
      "http://localhost:3000/api/workouts/items?page=1"
    );
    const data = await response.json();
    console.log("workouts", data);
    return data.message;
  }
);

const initialState = {
  entities: [],
  loading: false,
} as any;

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    loadMore: (state, action) => {
      state.entities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(workouts.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(workouts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { loadMore } = workoutsSlice.actions;

export default workoutsSlice.reducer;
