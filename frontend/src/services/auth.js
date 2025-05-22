import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery, baseErrorHandler} from "../utils";
import { authActions } from '../reducers';

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
            }),
            transformErrorResponse:baseErrorHandler,
            onQueryStarted: (_,{ dispatch, queryFulfilled }) => {
                queryFulfilled.then(({data})=>{
                    dispatch(authActions.saveUser(data.user))
                })
            }
        })
    })
});

export default authApi;