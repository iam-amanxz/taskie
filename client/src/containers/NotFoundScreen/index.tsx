import { Flex, Container, Heading, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { PATH_AUTH, PATH_LOGIN } from '../../constants/routes'

export const NotFoundSrceen = () => {
  const navigate = useNavigate()

  return (
    <Flex h="100vh" width="full" alignItems="center">
      <Container maxW="md" textAlign="center">
        <Heading mb={3}> Oops! Page Not Found</Heading>
        <Button mx="auto" onClick={() => navigate(PATH_AUTH)}>
          Go Home
        </Button>
      </Container>
    </Flex>
  )
}
