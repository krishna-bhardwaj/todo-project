import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/',
  credentials: 'include',
});

export const baseErrorHandler = (error) => {
    alert(error.data.message || "Something went wrong");
    return error.data;
};

export default baseQuery;