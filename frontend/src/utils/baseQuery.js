import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseErrorHandler = (error) => {
    alert(error.data.message || "Something went wrong");
    return error.data;
};

export default baseQuery;