import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseErrorHandler } from "../utils";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery,
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTask: builder.query({
      query: () => ({
        url: "getTasks",
        method: "GET",
      }),
      transformErrorResponse: baseErrorHandler,
      providesTags: ["tasks"],
    }),
    addTask: builder.mutation({
      query: (payload) => ({
        url: "addTask",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/deleteTask`,
        method: "DELETE",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
    updaateTitle: builder.mutation({
      query: ({ taskId, title }) => ({
        url: `${taskId}/updateTitle`,
        method: "PATCH",
        body: { title },
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    startTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/startTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
    completeTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/completeTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
    pauseTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/pauseTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
    resumeTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/resumeTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasks"],
    }),
  }),
});

export default taskApi;
