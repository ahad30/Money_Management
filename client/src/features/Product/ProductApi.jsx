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
      query: ({ searchText, categoryfilter, brandfilter, sort, currentPage, itemsPerPage }) => ({
        url: `/productSearch?search=${searchText ? searchText : ""}&categoryfilter=${categoryfilter ? categoryfilter : ""}&brandfilter=${brandfilter ? brandfilter : ""}&sort=${sort ? sort : ""}&page=${currentPage}&size=${itemsPerPage}`,
      }),
      providesTags: ["Products"],
    }),

    // New query for product count
    getProductCount: builder.query({
      query: ({ searchText, categoryfilter, brandfilter }) => ({
        url: `/productCount?search=${searchText ? searchText : ""}&categoryfilter=${categoryfilter ? categoryfilter : ""}&brandfilter=${brandfilter ? brandfilter : ""}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery, useGetProductCountQuery } = ProductApi;
