import { Container, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useRegisterMutation } from '../../api/auth'
import { AuthForm } from '../../components'
import { PATH_TASKS } from '../../constants/routes'
import { useAppDispatch } from '../../store'
import { setSessionAction } from '../../store/session/actions'
import { AuthDto, ErrorResponseResource } from '../../types'
import { useShowToast } from '../../hooks'

export const RegisterScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const { showErrorToast, showSuccessToast } = useShowToast()

  const handleRegister = async ({ name, email, password }: AuthDto) => {
    try {
      const result = await register({ name, email, password }).unwrap()
      dispatch(setSessionAction(result.payload!, true))
      showSuccessToast('Register successfull')
      navigate(PATH_TASKS)
    } catch (error: any) {
      const err = error as ErrorResponseResource
      dispatch(setSessionAction(null, false))
      if (err.statusCode === 400) {
        showErrorToast(err.errors[0]?.message ?? '')
        return
      }
      showErrorToast(err?.errorMessage ?? '')
    }
  }

  return (
    <Flex h="100vh" width="full" alignItems="center">
      <Container maxW="sm">
        <AuthForm
          action="register"
          isLoading={isLoading}
          onSubmit={handleRegister}
        />
      </Container>
    </Flex>
  )
}
