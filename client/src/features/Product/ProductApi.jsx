import apiSlice from "../API/apiSlice";

const ProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

 
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Products"],
    }),

    updateTask: builder.mutation({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `/tasks/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),


  }),
});

export const {
  useAddTaskMutation,
  useGetProductsQuery,
  useUpdateTaskMutation,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
} = ProductApi;
