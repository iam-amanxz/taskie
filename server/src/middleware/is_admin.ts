import { NextFunction, Request, Response } from 'express'
import {
  NotAdminException,
  NotTestEnvironmentException,
} from '../exceptions_and_responses'

/**
 * Only for testing (works only in test environment)
 */
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV !== 'test') {
    return next(new NotTestEnvironmentException())
  }

  const { secretKey } = req.body

  if (!secretKey || secretKey !== "ADMINSECRETKEY") {
    return next(new NotAdminException())
  }

  return next()
}
