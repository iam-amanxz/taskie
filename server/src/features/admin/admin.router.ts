// only for testing
import express from 'express'
import { adminController as controller } from './admin.controller'

const router = express.Router()

router.post('/users', controller.createUser)
router.delete('/users/:email', controller.deleteUser)
router.delete('/users', controller.flushUsers)
router.post('/tasks/:ownerId', controller.createTask)
router.delete('/tasks/:id', controller.deleteTask)
router.delete('/tasks', controller.flushTasks)

export { router as adminRouter }
