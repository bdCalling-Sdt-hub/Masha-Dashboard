
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

export const baseApi = createApi({
  reducerPath: "romzzApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.18:5000/api/v1",
    headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }, 
  }),
  endpoints: () => ({}),
});

export const imageUrl = "http://192.168.10.18:5000/";  