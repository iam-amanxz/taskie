import { User } from '@prisma/client'
import { userApi as api } from '../../api/user.api'
import {
  EmailExistsException,
  InvalidCredentialsException,
} from '../../exceptions-and-responses'
import { generateHash, generateSalt } from '../../utils'
import { SignupDto, SigninDto } from './auth.dto'

export const authService = {
  signUp: async (dto: SignupDto): Promise<User> => {
    const { email, password, name } = dto

    const emailExists = await api.findByEmail(email)

    if (emailExists) {
      throw new EmailExistsException(email)
    }

    const salt = generateSalt()
    const hash = generateHash(password, salt)

    return await api.create({ hash, salt, email, name })
  },

  signIn: async (dto: SigninDto): Promise<User> => {
    const { email, password } = dto

    const existingUser = await api.findByEmail(email)

    if (!existingUser) {
      throw new InvalidCredentialsException()
    }

    const { hash, salt } = existingUser
    const newHash = generateHash(password, salt)

    if (hash !== newHash) {
      throw new InvalidCredentialsException()
    }

    return existingUser
  },
}
