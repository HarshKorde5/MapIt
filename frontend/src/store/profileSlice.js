import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Fetch profiles using createAsyncThunk
export const fetchProfiles = createAsyncThunk("profile/fetchProfiles", async () => {
  const response = await fetch("http://localhost:5000/profiles");
  return response.json();
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [],
    selectedProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
