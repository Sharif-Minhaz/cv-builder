import { configureStore } from "@reduxjs/toolkit";
import cvReducer from "../features/cv/cvSlice";

export default configureStore({
	reducer: {
		cv: cvReducer,
	},
});
