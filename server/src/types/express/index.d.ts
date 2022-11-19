import { User } from '@prisma/client'

type RequestUser = Omit<User, 'hash' | 'salt'>

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUser
    }
  }
}

// to make the file a module and avoid the TypeScript error
export {}
