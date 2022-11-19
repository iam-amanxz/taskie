import { Prisma, Task as PrismaTask } from '@prisma/client'
import db from '../db'
import {
  ResourceNotFoundException,
  UnauthorizedException,
} from '../exceptions-and-responses'
import { CreateTaskDto, UpdateTaskDto } from '../features/task'

export const taskApi = {
  findAll: async (ownerId: number): Promise<Task[]> => {
    return await db.task.findMany({
      where: { ownerId },
      orderBy: { dueDate: 'asc' },
    })
  },

  findById: async (userId: number, taskId: number): Promise<Task | null> => {
    const task = await db.task.findFirst({ where: { id: taskId } })
    if (!task) {
      throw new ResourceNotFoundException()
    }
    if (task.ownerId !== userId) {
      throw new UnauthorizedException()
    }
    return await db.task.findFirst({ where: { id: task.id } })
  },

  create: async (ownerId: number, dto: CreateTaskDto): Promise<Task> => {
    const expired = new Date(dto.dueDate) < new Date()
    return await db.task.create({
      data: { ...dto, ownerId, expired, completed: false },
    })
  },

  update: async (
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> => {
    const task = await db.task.findFirst({ where: { id: taskId } })
    if (!task) {
      throw new ResourceNotFoundException()
    }
    if (task.ownerId !== userId) {
      throw new UnauthorizedException()
    }

    return await db.task.update({
      where: { id: task.id },
      data: dto,
    })
  },

  delete: async (userId: number, taskId: number): Promise<void> => {
    const task = await db.task.findFirst({ where: { id: taskId } })
    if (!task) {
      throw new ResourceNotFoundException()
    }
    if (task.ownerId !== userId) {
      throw new UnauthorizedException()
    }
    await db.task.delete({ where: { id: task.id } })
  },

  deleteByAdmin: async (taskId: number): Promise<Task> => {
    return await db.task.delete({ where: { id: taskId } })
  },
  deleteAll: async (): Promise<Prisma.BatchPayload> => {
    return await db.task.deleteMany()
  },
}

export type Task = PrismaTask
