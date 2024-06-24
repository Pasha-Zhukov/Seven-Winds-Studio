import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EID, BASE_URL } from "../constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchEntityData: builder.query({
      query: () => `/v1/outlay-rows/entity/${EID}/row/list`,
    }),
    createRow: builder.mutation({
      query: ({ data }) => ({
        url: `/v1/outlay-rows/entity/${EID}/row/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateRow: builder.mutation({
      query: ({ rID, updatedData }) => ({
        url: `/v1/outlay-rows/entity/${EID}/row/${rID}/update`,
        method: "POST",
        body: updatedData,
      }),
    }),
    deleteRow: builder.mutation({
      query: (rID) => ({
        url: `/v1/outlay-rows/entity/${EID}/row/${rID}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchEntityDataQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = api;
