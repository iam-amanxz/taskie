import { Button, Heading, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PATH_LOGIN, PATH_REGISTER } from '../constants/routes'
import { AuthDto } from '../types'
import { TextInput } from './TextInput'

interface AuthFormProps {
  action: 'login' | 'register'
  onSubmit: (data: AuthDto) => void
  isLoading: boolean
}

export const AuthForm = ({ onSubmit, isLoading, action }: AuthFormProps) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const isRegister = action === 'register'

  return (
    <>
      <Heading as="h2" size="lg" mb={5}>
        {isRegister ? 'Sign Up' : 'Sign In'}
      </Heading>

      {isRegister && (
        <TextInput
          mb={3}
          isRequired
          type="text"
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <TextInput
        mb={3}
        isRequired
        type="text"
        label="Email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        mb={5}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        isRequired
        type="password"
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        isLoading={isLoading}
        colorScheme="whatsapp"
        onClick={() => onSubmit({ name, email, password })}
        w="full"
        mb={3}
      >
        {isRegister ? 'Create Account' : 'Login'}
      </Button>

      <Text>
        {isRegister ? 'Already' : "Don't"} have an account?{' '}
        <Link
          color="blue.600"
          onClick={() => navigate(isRegister ? PATH_LOGIN : PATH_REGISTER)}
        >
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </Text>
    </>
  )
}
