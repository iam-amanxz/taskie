import express from 'express'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import { deserializeUser, globalErrorHandler, isAdmin } from './middleware'
import { authRouter } from './features/auth'
import { taskRouter } from './features/task'
import { adminRouter } from './features/admin/admin.router'

const app = express()
const domainsFromEnv = process.env.CORS_DOMAINS || ''
const whitelist = domainsFromEnv.split(',').map((item) => item.trim())
const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(deserializeUser)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/admin', isAdmin, adminRouter)
app.use(globalErrorHandler)

export default app
