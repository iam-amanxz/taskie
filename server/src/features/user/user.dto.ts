export interface CreateUserDto {
  name: string
  email: string
  hash: string
  salt: string
}
