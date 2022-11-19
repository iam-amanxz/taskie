import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { taskService as service } from './task.service'
import {
  ApiResponse,
  UnauthorizedException,
  ValidationException,
} from '../../exceptions-and-responses'
import { mapExpressErrorsToLocal, monthsMap } from '../../utils'
import { CronJob } from 'cron'
import { sendDueExpirationEmail } from '../email'
import logger from '../../logger'
import { UpdateTaskDto } from './task.dto'

export const taskController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    try {
      const task = await service.create(Number(req.user!.id), req.body)
      const dueDate = new Date(task.dueDate)
      const month = dueDate.getMonth() + 1
      const monthName = monthsMap[month]
      const date = dueDate.getDate()
      const hour =
        dueDate.getHours() + Number(process.env.EMAIL_ADDITIONAL_HOURS ?? 0)
      const minute = dueDate.getMinutes()

      const cronTime = `0 ${minute} ${hour} ${date} ${monthName} *`

      const job: CronJob = new CronJob(
        cronTime,
        async () => {
          const dbTask = await service.getById(req.user!.id, task.id)
          if (!dbTask) {
            return job.stop()
          }
          if (dbTask.completed) {
            return job.stop()
          }
          sendDueExpirationEmail(task, req.user!.email)
            .then((info) => {
              logger.debug('Email sent: ', info.messageId)
            })
            .catch((e) => {
              logger.error('Email sending failed', e)
            })

          const patch: UpdateTaskDto = {
            ...task,
            dueDate: task.dueDate.toISOString(),
            expired: true,
          }
          await service.update(req.user!.id, patch.id, patch)
          job.stop()
        },
        () => {
          console.log('cron job completed')
        },
        true,
      )

      res
        .status(201)
        .json(ApiResponse.created({ path: req.url, payload: task }))
    } catch (error) {
      return next(error)
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await service.getAll(Number(req.user!.id))
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: tasks }))
    } catch (error) {
      return next(error)
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    try {
      const task = await service.getById(
        Number(req.user!.id),
        Number(req.params.id),
      )
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: task }))
    } catch (error) {
      return next(error)
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    if (Number(req.body.ownerId) !== Number(req.user!.id)) {
      return next(new UnauthorizedException())
    }

    try {
      const task = await service.update(
        Number(req.user!.id),
        Number(req.params.id),
        req.body,
      )
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: task }))
    } catch (error) {
      return next(error)
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors)
      return next(new ValidationException(errorMap))
    }

    try {
      await service.delete(Number(req.user!.id), Number(req.params.id))
      res.status(200).json(ApiResponse.ok({ path: req.url, payload: {} }))
    } catch (error) {
      return next(error)
    }
  },
}
