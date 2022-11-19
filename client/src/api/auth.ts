import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LOCAL_STORAGE_KEY } from '../constants/app'
import { useLocalStorage } from '../hooks'
import {
  ErrorResponseResource,
  LoginDto,
  RegisterDto,
  SuccessResponseResource,
  User,
} from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL + '/auth'

export const authApi = createApi({
  reducerPath: 'authAPi',
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
    fetchUserProfile: builder.query<SuccessResponseResource<User>, void>({
      query: () => ({
        url: '/me',
      }),
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
    login: builder.mutation<SuccessResponseResource<any>, LoginDto>({
      query: (body) => ({
        url: '/sign-in',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
    register: builder.mutation<SuccessResponseResource<any>, RegisterDto>({
      query: (body) => ({
        url: '/sign-up',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response, meta, args) =>
        response.data as ErrorResponseResource,
    }),
  }),
})

export const {
  useFetchUserProfileQuery,
  useLoginMutation,
  useRegisterMutation,
} = authApi
