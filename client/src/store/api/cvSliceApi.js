import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		viewAllCV: builder.query({
			query: () => "/cv",
			providesTags: ["CV"],
		}),

		viewUserCV: builder.query({
			query: () => `/cv/user`,
			providesTags: ["CV"],
		}),

		createCV: builder.mutation({
			query: (body) => {
				return {
					url: "/cv",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["CV"],
		}),

		deleteCV: builder.mutation({
			query: (userId) => {
				return {
					url: `/cv/${userId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["CV"],
		}),

		updateCV: builder.mutation({
			query: (body) => {
				return {
					url: "/cv",
					method: "PATCH",
					body: body,
				};
			},
			invalidatesTags: ["CV"],
		}),

		viewSingleCV: builder.query({
			query: (id) => `/cv/${id}`,
			providesTags: ["CV"],
		}),
	}),
});

export const {
	useViewAllCVQuery,
	useViewSingleCVQuery,
	useCreateCVMutation,
	useDeleteCVMutation,
	useUpdateCVMutation,
	useViewUserCVQuery,
} = extendedApiSlice;
