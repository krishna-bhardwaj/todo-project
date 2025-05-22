import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery, baseErrorHandler} from "../utils";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            transformErrorResponse: baseErrorHandler,
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials
            }),
            transformErrorResponse: baseErrorHandler,
        }),
        verify: builder.query({
            query: () => ({
                url:'verify',
                methode: 'GET'
            })
        })
    })
});

export default authApi;