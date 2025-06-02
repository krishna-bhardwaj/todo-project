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
  }),
});

export default taskApi;
