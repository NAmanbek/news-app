import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = '9ae5a1230ad34c72b07784548b9b243a';
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getLatestNews: builder.query<any, { query: string; sortBy: string; from: string; to: string }>({
      query: ({ query, sortBy, from, to }) => {
        const encodedQuery = encodeURIComponent(query);

        return `/everything?q=${encodedQuery}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${API_KEY}&pageSize=50`;
      },
    }),
  }),
});

export const { useGetLatestNewsQuery } = newsApi;