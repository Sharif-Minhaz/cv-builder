import { configureStore } from "@reduxjs/toolkit";
import cvReducer from "./cv/cvSlice";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cv: cvReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
