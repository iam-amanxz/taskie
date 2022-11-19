import { Prisma, User as PrismaUser } from '@prisma/client'
import db from '../db'
import { CreateUserDto } from '../features/user'

export const userApi = {
  findByEmail: async (email: string): Promise<User | null> => {
    return await db.user.findFirst({ where: { email } })
  },
  create: async (dto: CreateUserDto): Promise<User> => {
    return await db.user.create({ data: { ...dto } })
  },
  delete: async (email: string): Promise<User> => {
    return await db.user.delete({ where: { email } })
  },
  deleteAll: async (): Promise<Prisma.BatchPayload> => {
    return await db.user.deleteMany()
  },
}

export type User = PrismaUser
