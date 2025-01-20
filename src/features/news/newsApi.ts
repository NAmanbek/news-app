import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = '9ae5a1230ad34c72b07784548b9b243a';
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getLatestNews: builder.query({
      query: () => `top-headlines?country=us&apiKey=${API_KEY}`
    }),
  }),
});

export const { useGetLatestNewsQuery } = newsApi;