import { userApi } from '../../api/user.api'
import { taskApi } from '../../api/task.api'
import { CreateTaskDto } from '../task'
import { SignupDto } from '../auth'
import { generateHash, generateSalt } from '../../utils'
import { EmailExistsException } from '../../exceptions_and_responses'

export const adminService = {
  createUser: async (dto: SignupDto) => {
    const emailExists = await userApi.findByEmail(dto.email)

    if (emailExists) {
      throw new EmailExistsException(dto.email)
    }

    const salt = generateSalt()
    const hash = generateHash(dto.password, salt)
    return await userApi.create({
      hash,
      salt,
      name: dto.name,
      email: dto.email,
    })
  },
  deleteUser: async (email: string) => {
    return await userApi.delete(email)
  },
  flushUsers: async () => {
    return await userApi.deleteAll()
  },
  createTask: async (ownerId: number, dto: CreateTaskDto) => {
    return await taskApi.create(ownerId, dto)
  },
  deleteTask: async (taskId: number) => {
    return await taskApi.deleteByAdmin(taskId)
  },
  flushTasks: async () => {
    return await taskApi.deleteAll()
  },
}
