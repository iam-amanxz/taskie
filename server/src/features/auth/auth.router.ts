import express from 'express'
import { checkSchema } from 'express-validator'
import { isAuthenticated } from '../../middleware'
import { authSchema } from './auth.schema'
import { authController as controller } from './auth.controller'

const router = express.Router()

router.post('/sign-up', checkSchema(authSchema.signUp), controller.signUp)
router.post('/sign-in', checkSchema(authSchema.signIn), controller.signIn)
router.get('/me', isAuthenticated, controller.getMe)

export { router as authRouter }