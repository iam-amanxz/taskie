import { Schema } from 'express-validator'

const commonSchema: Schema = {
  email: {
    in: ['body'],
    notEmpty: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Email must be valid' },
  },
  password: {
    in: ['body'],
    notEmpty: { errorMessage: 'Password is required' },
    isLength: {
      options: { min: 4 },
      errorMessage: 'Password must be at least 4 characters long',
    },
  },
}

const signIn: Schema = commonSchema

const signUp: Schema = {
  ...commonSchema,
  name: {
    in: ['body'],
    notEmpty: { errorMessage: 'Name is required' },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Name must be at least 2 characters long',
    },
  },
}

export const authSchema = { signUp, signIn }
