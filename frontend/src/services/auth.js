import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/v1/"}),
    endpoints: (builder) => ({
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