import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LOCAL_STORAGE_KEY } from '../constants/app'
import { useLocalStorage } from '../hooks'
import {
  CreateTaskDto,
  ErrorResponseResource,
  SuccessResponseResource,
  Task,
} from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL + '/tasks'

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    prepareHeaders(headers, api) {
      const { get } = useLocalStorage()
      const token = get(LOCAL_STORAGE_KEY)
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchAllTasks: builder.query<SuccessResponseResource<Task[]>, void>({
      query: () => ({
        url: '',
      }),
      providesTags: ['Task'],
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
    createTask: builder.mutation<SuccessResponseResource<any>, CreateTaskDto>({
      query: (body) => ({
        url: BASE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
    deleteTask: builder.mutation<SuccessResponseResource<any>, number>({
      query: (id) => ({
        url: `${BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
    updateTask: builder.mutation<SuccessResponseResource<any>, Task>({
      query: (body) => ({
        url: `${BASE}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
  }),
})

export const {
  useFetchAllTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation
} = taskApi
