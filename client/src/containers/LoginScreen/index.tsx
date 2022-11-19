import { Container, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '../../api/auth'
import { PATH_TASKS } from '../../constants/routes'
import { AuthDto, ErrorResponseResource } from '../../types'
import { AuthForm } from '../../components'
import { useShowToast } from '../../hooks'
import { useAppDispatch } from '../../store'
import { setSessionAction } from '../../store/session/actions'
import { taskApi } from '../../api'

export const LoginScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const { showErrorToast, showSuccessToast } = useShowToast()

  const handleLogin = async ({ email, password }: AuthDto) => {
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setSessionAction(result.payload!, true))
      showSuccessToast('Login successfull')
      navigate(PATH_TASKS)
    } catch (error) {
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
          action="login"
          isLoading={isLoading}
          onSubmit={handleLogin}
        />
      </Container>
    </Flex>
  )
}
