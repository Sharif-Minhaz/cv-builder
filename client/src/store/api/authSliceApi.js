import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		currentUser: builder.query({
			query: () => "/auth/current",
			providesTags: ["User"],
		}),

		doLogin: builder.mutation({
			query: (body) => {
				return {
					url: "/auth/login",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["User", "CV"],
		}),

		doSignup: builder.mutation({
			query: (body) => {
				return {
					url: "/auth/signup",
					method: "POST",
					body,
				};
			},
		}),

		doLogout: builder.mutation({
			query: () => {
				return {
					url: "/auth/logout",
					method: "POST",
				};
			},
			invalidatesTags: ["User", "CV"],
		}),
	}),
});

export const { useCurrentUserQuery, useDoLoginMutation, useDoSignupMutation, useDoLogoutMutation } =
	extendedApiSlice;
