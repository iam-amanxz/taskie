import jwt from 'jsonwebtoken'
import { UnauthenticatedException } from '../exceptions-and-responses'

interface JwtPayload {
  userId: number
  userEmail: string
  userName: string
}

export const issueAuthToken = async (payload: JwtPayload): Promise<string> => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  })
  return token
}

export const verifyAuthToken = async (
  token: string,
): Promise<JwtPayload> => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string)
    return decoded as JwtPayload
  } catch (error) {
    throw new UnauthenticatedException()
  }
}
