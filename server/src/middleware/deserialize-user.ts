import { NextFunction, Request, Response } from 'express'
import { ResourceNotFoundException } from '../exceptions-and-responses'
import { userService } from '../features/user'

/**
 * Fetches user data from the db and attaches to the request if logged in
 */
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next()
  }

  const user = await userService.getByEmail(req.user.email)

  if (!user) {
    return next(new ResourceNotFoundException())
  }

  const { salt, hash, ...rest } = user
  req.user = rest

  next()
}
