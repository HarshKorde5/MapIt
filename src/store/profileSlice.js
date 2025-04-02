import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [], // List of profiles
    selectedProfile: null, // Store selected profile
  },
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
  },
});

export const { setProfiles, setSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
