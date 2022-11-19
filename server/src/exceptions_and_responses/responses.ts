import { ErrorResponseResource, SuccessResponseResource } from '../types'
import {
  ConflictException,
  GenericException,
  ResourceNotFoundException,
  UnauthenticatedException,
  UnauthorizedException,
  ValidationException,
} from '.'

export class ApiResponse {
  static ok<T>(args: { path: string; payload: T }): SuccessResponseResource<T> {
    return {
      success: true,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: args.payload,
    }
  }

  static created<T>(args: {
    path: string
    payload: T
  }): SuccessResponseResource<T> {
    return {
      success: true,
      statusCode: 201,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: args.payload,
    }
  }

  static noContent(args: {
    path: string
    payload: []
  }): SuccessResponseResource<[]> {
    return {
      success: true,
      statusCode: 204,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: [],
    }
  }

  static genericError(args: {
    path: string
    ex: GenericException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: GenericException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }

  static badValidation(args: {
    path: string
    ex: ValidationException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: ValidationException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: args.ex.errors,
    }
  }

  static badRequest(args: { path: string; ex: Error }): ErrorResponseResource {
    return {
      success: false,
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }

  static notFound(args: {
    path: string
    ex: ResourceNotFoundException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: ResourceNotFoundException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }

  static conflict(args: {
    path: string
    ex: ConflictException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: ConflictException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }

  static unauthenticated(args: {
    path: string
    ex: UnauthenticatedException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: UnauthenticatedException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }

  static unauthorized(args: {
    path: string
    ex: UnauthenticatedException
  }): ErrorResponseResource {
    return {
      success: false,
      statusCode: UnauthorizedException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: [],
    }
  }
}
