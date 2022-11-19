export interface CreateTaskDto {
  title: string
  dueDate: string
  expired: boolean
  ownerId: number
}

export interface UpdateTaskDto {
  id: number
  title: string
  dueDate: string
  expired: boolean
  ownerId: number
}
