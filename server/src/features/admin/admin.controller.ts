import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../../exceptions-and-responses'
import { adminService, adminService as service } from './admin.service'

export const adminController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { salt, hash, ...rest } = await adminService.createUser(req.body)
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: rest }))
    } catch (error) {
      return next(error)
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { salt, hash, ...rest } = await adminService.deleteUser(
        req.params.email,
      )
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: rest }))
    } catch (error) {
      return next(error)
    }
  },
  flushUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await adminService.flushUsers()
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: true }))
    } catch (error) {
      console.error(error)
      return next(error)
    }
  },
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { secretKey, ...rest } = req.body
      const task = await adminService.createTask(
        Number(req.params.ownerId),
        rest,
      )
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: task }))
    } catch (error) {
      return next(error)
    }
  },
  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await adminService.deleteTask(Number(req.params.id))
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: task }))
    } catch (error) {
      return next(error)
    }
  },
  flushTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await adminService.flushTasks()
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: true }))
    } catch (error) {
      return next(error)
    }
  },
}
