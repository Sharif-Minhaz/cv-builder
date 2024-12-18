import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: "include", // send cookies with requests
	}),
	tagTypes: ["User", "CV"],
	endpoints: (_) => ({}),
});
