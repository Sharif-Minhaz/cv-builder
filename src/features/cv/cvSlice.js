import { readLocalStorageValue } from "@mantine/hooks";
import { createSlice } from "@reduxjs/toolkit";

export const cvSlice = createSlice({
	name: "cv",
	initialState: {
		cv: readLocalStorageValue({ key: "cv" })?.json || {},
	},
	reducers: {
		addDataToStore: (state, data) => {
			state.cv = data.payload;
		},
		clearDataFromStore: (state) => {
			state.cv = {};
		},
	},
});

// Action creators are generated for each case reducer function
export const { addDataToStore, clearDataFromStore } = cvSlice.actions;

export const selectCvValue = (state) => state.cv.cv;

export default cvSlice.reducer;
