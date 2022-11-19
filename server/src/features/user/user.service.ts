import { userApi as api } from '../../api'
import { User } from '../../api/user.api'

export const userService = {
  getByEmail: async (email: string): Promise<User | null> => {
    return api.findByEmail(email)
  },
}
