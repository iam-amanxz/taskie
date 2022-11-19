export interface ErrorMessage {
  param: string
  message: string
}

interface BaseResponseResource {
  timestamp: string
  statusCode: number
  path: string
}

export interface SuccessResponseResource<T> extends BaseResponseResource {
  success: true
  payload: T
}

export interface ErrorResponseResource extends BaseResponseResource {
  success: false
  errorMessage?: string
  errors: ErrorMessage[]
}

export type ResponseResource<T> =
  | SuccessResponseResource<T>
  | ErrorResponseResource
