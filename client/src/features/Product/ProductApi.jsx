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
      query: ({searchText, categoryfilter , brandfilter, sort }) => ({
        url: `/productSearch?search=${searchText ? searchText : ""}&categoryfilter=${categoryfilter? categoryfilter : ""}&brandfilter=${brandfilter? brandfilter : ""}&sort=${sort? sort : ""}`,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = ProductApi;
