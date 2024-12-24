import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadImage: builder.mutation({
			query: (body) => {
				// Prepare the file data for local upload
				const formData = new FormData();
				formData.append("profileImage", body);

				return {
					url: "/image",
					method: "POST",
					body: formData,
				};
			},
			invalidatesTags: ["CV"],
		}),

		deleteImage: builder.mutation({
			query: (image_url) => {
				return {
					url: `/image/${image_url}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["CV"],
		}),
	}),
});

export const { useUploadImageMutation, useDeleteImageMutation } = extendedApiSlice;
