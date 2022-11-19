import express from 'express'
import { checkSchema } from 'express-validator'
import { taskController as controller } from './task.controller'
import { isAuthenticated } from '../../middleware'
import { taskSchema } from './task.schema'

const router = express.Router()

router.get('/', isAuthenticated, controller.getAll)
router.post(
  '/',
  isAuthenticated,
  checkSchema(taskSchema.create),
  controller.create,
)
router.get(
  '/:id',
  isAuthenticated,
  checkSchema(taskSchema.get),
  controller.getOne,
)
router.delete(
  '/:id',
  isAuthenticated,
  checkSchema(taskSchema.remove),
  controller.delete,
)
router.put(
  '/:id',
  isAuthenticated,
  checkSchema(taskSchema.update),
  controller.update,
)

export { router as taskRouter }
