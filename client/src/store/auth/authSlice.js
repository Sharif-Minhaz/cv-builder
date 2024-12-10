import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: {},
	},
	reducers: {
		setAuthData: (state, data) => {
			state.auth = data.payload;
		},
		clearAuthData: (state) => {
			state.auth = {};
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAuthData, clearAuthData } = authSlice.actions;

export const selectAuthValue = (state) => state.auth.auth;

export default authSlice.reducer;
