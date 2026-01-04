import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryHeaders = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).authUser.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
}); // * not sure if this is going to be used