import { ErrorMessage } from '../types'

export class GenericException extends Error {
  static code = 500

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, GenericException.prototype)
  }
}

export class UnauthenticatedException extends Error {
  static code = 401
  static message = 'You are not authenticated to access this resource'

  constructor() {
    super(UnauthenticatedException.message)
    Object.setPrototypeOf(this, UnauthenticatedException.prototype)
  }
}

export class UnauthorizedException extends Error {
  static code = 403
  static message = 'You are not allowed to access this resource'

  constructor() {
    super(UnauthorizedException.message)
    Object.setPrototypeOf(this, UnauthorizedException.prototype)
  }
}

export class ResourceNotFoundException extends Error {
  static code = 404
  static message = 'Resource not found'

  constructor() {
    super(ResourceNotFoundException.message)
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}

export class ValidationException extends Error {
  errors: ErrorMessage[]
  static code = 400
  static message = 'Request validation failed'

  constructor(errors: ErrorMessage[] = []) {
    super(ValidationException.message)
    this.errors = errors
    Object.setPrototypeOf(this, ValidationException.prototype)
  }
}

export class ConflictException extends Error {
  static code = 409

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ConflictException.prototype)
  }
}

export class UsernameExistsException extends ConflictException {
  constructor(username: string) {
    super(`Username ${username} already exists`)
    Object.setPrototypeOf(this, UsernameExistsException.prototype)
  }
}

export class EmailExistsException extends ConflictException {
  constructor(email: string) {
    super(`Email ${email} already exists`)
    Object.setPrototypeOf(this, EmailExistsException.prototype)
  }
}

export class InvalidCredentialsException extends Error {
  static code = 400
  static message = 'Invalid credentials'

  constructor() {
    super(InvalidCredentialsException.message)
    Object.setPrototypeOf(this, InvalidCredentialsException.prototype)
  }
}

export class NotTestEnvironmentException extends Error {
  static code = 500
  static message = 'Not test environment'

  constructor() {
    super(NotTestEnvironmentException.message)
    Object.setPrototypeOf(this, NotTestEnvironmentException.prototype)
  }
}

export class NotAdminException extends Error {
  static code = 500
  static message = 'Not an admin'

  constructor() {
    super(NotAdminException.message)
    Object.setPrototypeOf(this, NotAdminException.prototype)
  }
}
