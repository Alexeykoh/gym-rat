import { LocalStorageAPI } from "@/lib/helpers";
import { UserService } from "@/services/user.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/getUser",
  async (email: string) => {
    const data = await LocalStorageAPI({
      name: "userData",
      get: async () => {
        return UserService.getUserByEmail(email);
      },
    });
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    save: (state, action) => {
      state = action.payload;
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

export const { save } = userSlice.actions;

export default userSlice.reducer;
