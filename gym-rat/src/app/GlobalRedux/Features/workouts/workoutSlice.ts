import { LocalStorageAPI } from "@/lib/helpers";
import { WorkoutService } from "@/services/workouts.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWorkouts = createAsyncThunk(
  "workouts/getWorkouts",
  async (userID: string) => {
    const data = await LocalStorageAPI({
      name: "workoutsData",
      get: async () => {
        return WorkoutService.getAllById(userID);
      },
    });
    return data;
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
    save: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkouts.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(fetchWorkouts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { save } = workoutsSlice.actions;

export default workoutsSlice.reducer;
