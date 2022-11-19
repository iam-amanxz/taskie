import { NextFunction, Request, Response } from 'express'
import { userApi } from '../api'
import { UnauthenticatedException } from '../exceptions_and_responses'
import { verifyAuthToken } from '../utils'

/**
 * Throws UnauthenticatedException if user is not authenticated
 */
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    return next(new UnauthenticatedException())
  }

  const token = authorizationHeader.split(' ')[1]
  if (!token) {
    return next(new UnauthenticatedException())
  }

  try {
    const decoded = await verifyAuthToken(token)
    const user = await userApi.findByEmail(decoded.userEmail)

    if (!user) {
      return next(new UnauthenticatedException())
    }
    const { hash, salt, ...rest } = user
    req.user = rest
    return next()
  } catch (error) {
    return next(new UnauthenticatedException())
  }
}
