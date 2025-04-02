import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
  },
});

export const { setSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
