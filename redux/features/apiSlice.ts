import { appServiceApi } from "@/lib/services/appServiceApi"
import { getAllTasksStakeData } from "@/lib/utils"
import { GetTaskByIdRequest, CreateTaskRequest } from "@/types"
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"

const categoriesApiAdapter = createEntityAdapter({
  sortComparer: (a: any, b) => b?.created_at.localeCompare(a?.created_at),
})
const allTasksApiAdapter = createEntityAdapter({
  sortComparer: (a: any, b) => b?.created_at.localeCompare(a?.created_at),
})
const allTaskInitialState = allTasksApiAdapter.getInitialState()
const initialState = categoriesApiAdapter.getInitialState()
export const apiSlice = appServiceApi.injectEndpoints({
  // Define the endpoints for the API service using a builder callback
  // The builder provides methods for defining query and mutation endpoints
  endpoints: (builder) => ({
    postJwtToken: builder.mutation({
      query: ({ jwtToken }) => ({
        url: `/auth/user`,
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    }),
    getWorkloadCategories: builder.query({
      query: () => `/categories`,
      transformResponse: async (data: any) => {
        return categoriesApiAdapter.setAll(initialState, data?.data ?? [])
      },
    }),
    getWorkloadById: builder.query({
      query: (workloadId) => `/workloads/${workloadId}`,
      transformResponse: async (data: any) => {
        return data?.data
      },
    }),
    createTask: builder.mutation({
      query: ({
        createTaskRequestData,
        jwtToken,
      }: {
        createTaskRequestData: CreateTaskRequest
        jwtToken: string | null
      }) => ({
        url: `/auth/tasks`,
        method: "POST",
        body: createTaskRequestData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
      transformResponse: async (data: any) => {
        return data?.data
      },
    }),
    getTaskById: builder.query({
      query: ({ id, jwtToken }: GetTaskByIdRequest) => ({
        url: `/auth/tasks/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
      transformResponse: async (data: any) => {
        return data?.data
      },
    }),
    getAllTasks: builder.query({
      query: ({ id, jwtToken }: GetTaskByIdRequest) => ({
        url: `/auth/tasks?workloadId=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
      providesTags: ["AllTasks"],

      transformResponse: async (data: any) => {
        const allTasksDetails = await getAllTasksStakeData(data)

        return categoriesApiAdapter.setAll(
          allTaskInitialState,
          allTasksDetails ?? [],
        )
      },
    }),
    updateTaskTxHash: builder.mutation({
      query: ({ transaction_hash, taskId, jwtToken }) => ({
        url: `/auth/tasks/${taskId}`,
        method: "PUT",
        body: { transaction_hash },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
      invalidatesTags: ["AllTasks"],
    }),
    getTaskInfra: builder.query({
      query: ({ id, jwtToken }: GetTaskByIdRequest) => ({
        url: `/auth/tasks/${id}/details`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),

      transformResponse: async (data: any) => {
        return data?.data
      },
    }),
    getUserStats: builder.query({
      query: (workloadId: string) => ({
        url: `/workloads/${workloadId}/tasks`,
        method: "GET",
      }),
      transformResponse: async (data: any) => {
        return data?.data
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetWorkloadCategoriesQuery,
  useGetWorkloadByIdQuery,
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskTxHashMutation,
  useGetTaskInfraQuery,
  useGetUserStatsQuery,
  usePostJwtTokenMutation,
} = apiSlice

/**
 * Selectors
 */
// selecting getWorkloadCategories response
export const selectAllTasksResult = apiSlice.endpoints.getAllTasks.select({
  id: "",
  jwtToken: "",
})

// extracting data field from the result
const selectAllTasksData = createSelector(
  selectAllTasksResult,
  (result) => result.data,
)

// creating dynamic selector for the getWorkloadCategories response
export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  allTasksApiAdapter.getSelectors(
    (state: any) => selectAllTasksData(state) ?? allTaskInitialState,
  )
/**
 * Selectors
 */
// selecting getWorkloadCategories response
export const selectWorkloadCategoriesResult =
  apiSlice.endpoints.getWorkloadCategories.select("")

// extracting data field from the result
const selectWorkloadCategoriesData = createSelector(
  selectWorkloadCategoriesResult,
  (result) => result.data,
)

// creating dynamic selector for the getWorkloadCategories response
export const {
  selectAll: selectWorkloadCategories,
  selectById: selectWorkloadCategoryById,
} = categoriesApiAdapter.getSelectors(
  (state: any) => selectWorkloadCategoriesData(state) ?? initialState,
)
