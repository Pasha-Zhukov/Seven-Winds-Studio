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
    createStartRow: builder.mutation({
      query: () => ({
        url: `/v1/outlay-rows/entity/${EID}/row/create`,
        method: "POST",
        body: {
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: null,
          rowName: "",
          salary: 0,
          supportCosts: 0,
        },
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
  useCreateStartRowMutation,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = api;
