import { Task, taskApi as api } from '../../api/task.api'
import { CreateTaskDto, UpdateTaskDto } from '.'

export const taskService = {
  getAll: async (ownerId: number): Promise<Task[]> => {
    return api.findAll(ownerId)
  },

  getById: async (userId: number, id: number): Promise<Task | null> => {
    return api.findById(userId, id)
  },

  create: async (ownerId: number, dto: CreateTaskDto): Promise<Task> => {
    return api.create(ownerId, dto)
  },

  update: async (
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> => {
    return api.update(userId, taskId, dto)
  },

  delete: async (userId: number, id: number): Promise<void> => {
    return api.delete(userId, id)
  },
}
