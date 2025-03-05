/*import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
};

// Base URL should point to the root endpoint, not /stats
const baseUrl = "https://coinranking1.p.rapidapi.com"; 

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins`),
      // Add transformResponse to handle the API's response structure
      transformResponse: (response) => response.data.coins,
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      transformResponse: (response) => response.data.coin,
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => 
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
      transformResponse: (response) => response.data.history,
    }),
  }),
});

export const { 
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery 
} = cryptoApi;*/
 import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      // Return full data object with { stats, coins }
      transformResponse: (response) => response.data,
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      transformResponse: (response) => response.data.coin,
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { 
  useGetCryptosQuery, 
  useGetCryptoDetailsQuery, 
  useGetCryptoHistoryQuery 
} = cryptoApi;
