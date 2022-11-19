import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
  ApiResponse,
  ValidationException,
} from '../../exceptions_and_responses'
import { issueAuthToken, mapExpressErrorsToLocal } from '../../utils'
import { authService as service } from './auth.service'

export const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    const { email, password, name } = req.body

    let user: User
    try {
      user = await service.signUp({ email, password, name })
    } catch (error) {
      return next(error)
    }

    const token = await issueAuthToken({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    })

    const { salt, hash, ...rest } = user
    req.user = rest
    res.status(201).json(ApiResponse.ok({ path: req.url, payload: token }))
  },

  signIn: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    const { email, password } = req.body

    let user: User
    try {
      user = await service.signIn({ email, password })
    } catch (error) {
      return next(error)
    }

    const token = await issueAuthToken({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    })

    const { salt, hash, ...rest } = user
    req.user = rest
    res.status(200).json(ApiResponse.ok({ path: req.url, payload: token }))
  },

  getMe: (req: Request, res: Response) => {
    res.status(200).json(ApiResponse.ok({ path: req.url, payload: req.user }))
  },
}
