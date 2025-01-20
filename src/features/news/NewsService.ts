import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: () => `top-headlines?country=us&apiKey=YOUR_API_KEY`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
