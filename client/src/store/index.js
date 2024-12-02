import { configureStore } from "@reduxjs/toolkit";
import cvReducer from "./cv/cvSlice";

import { apiSlice } from "./api/apiSlice";

export default configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cv: cvReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
