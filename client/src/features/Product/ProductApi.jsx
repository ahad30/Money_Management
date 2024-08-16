import apiSlice from "../API/apiSlice";

const ProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Products"],
    }),

    searchProducts: builder.query({
      query: (searchText) => ({
        url: `/productSearch?search=${searchText}`,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = ProductApi;
