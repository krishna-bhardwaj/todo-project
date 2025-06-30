import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseErrorHandler } from "../utils";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery,
  tagTypes: ["tasksSummary"],
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (params) => ({
        url: "getTasks",
        method: "GET",
        params,
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
      invalidatesTags: ["tasksSummary"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/deleteTask`,
        method: "DELETE",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasksSummary"],
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
      invalidatesTags: ["tasksSummary"],
    }),
    completeTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/completeTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasksSummary"],
    }),
    pauseTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/pauseTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasksSummary"],
    }),
    resumeTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}/resumeTask`,
        method: "PATCH",
      }),
      transformErrorResponse: baseErrorHandler,
      invalidatesTags: ["tasksSummary"],
    }),
    getHistory: builder.query({
      query: (taskId) => ({
        url: `${taskId}/getHistory`,
        method: "GET",
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    getSummary: builder.query({
      query: () => ({
        url: "getSummary",
        method: "GET",
      }),
      transformErrorResponse: baseErrorHandler,
      providesTags: ["tasksSummary"],
    }),
  }),
});

export default taskApi;
