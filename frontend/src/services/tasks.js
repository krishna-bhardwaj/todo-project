import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseErrorHandler } from "../utils";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery,
  endpoints: (builder) => ({
    getTask: builder.query({
      query: () => ({
        url: "getTasks",
        method: "GET",
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    addTask: builder.mutation({
      query: (payload) => ({
        url: "addTask",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `deleteTask/${taskId}`,
        method: "DELETE",
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    updaateTitle: builder.mutation({
      query: ({ taskId, title }) => ({
        url: `updateTitle/${taskId}`,
        method: "PATCH",
        body: { title },
      }),
      transformErrorResponse: baseErrorHandler,
    }),
  }),
});

export default taskApi;
