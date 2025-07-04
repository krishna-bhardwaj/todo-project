import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseErrorHandler } from "../utils";
import { authActions } from "../reducers";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "login",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: baseErrorHandler,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(({ data }) => {
            dispatch(authActions.saveUser({ ...data.user }));
          })
          .catch(() => {
            dispatch(authActions.incrementLoginFailCount());
          });
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: baseErrorHandler,
    }),
    verify: builder.query({
      query: () => ({
        url: "verify",
        method: "GET",
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(({ data }) => {
            dispatch(authActions.saveUser(data.user));
          })
          .catch((err) => {});
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(authActions.logOut());
          })
          .catch(() => {
            alert("log out unsuccessfull");
          });
      },
    }),
  }),
});

export default authApi;
