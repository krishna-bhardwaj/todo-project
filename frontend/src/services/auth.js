import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../utils";

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
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials
            })
        })
    })
});

export default authApi;