interface BaseAuthDto {
  email: string
  password: string
}

export interface SignupDto extends BaseAuthDto {
  name: string
}

export interface SigninDto extends BaseAuthDto {}
