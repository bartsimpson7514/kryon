import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Create an API service using the createApi function
export const appServiceApi = createApi({
  reducerPath: "appServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://consensuscloud.prd.unmarshal.com/v1",
  }),
  tagTypes: ["AllTasks"],

  endpoints: () => ({}),
})
