import {
  Container,
  Flex,
  Heading,
  Text,
  Box,
  IconButton,
  forwardRef,
} from '@chakra-ui/react'
import { BiPowerOff } from 'react-icons/bi'

interface HeaderProps {
  username: string
  tasksCount: number
  onSignOut: () => void
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'Morning'
  }
  if (hour < 17) {
    return 'Afternoon'
  }
  return 'Evening'
}

export const TaskHeader = forwardRef(
  ({ username, tasksCount, onSignOut }: HeaderProps, ref) => {
    return (
      <Box
        backgroundColor="green.400"
        padding={[4, 6]}
        ref={ref}
        position="sticky"
        style={{ top: 0, zIndex: 1000 }}
      >
        <Container maxW="6xl">
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Box>
              <Heading as="h2" size="lg" color="white">
                Good {getGreeting()}, {username}!
              </Heading>
              <Text fontSize="sm" color="white">
                You have {tasksCount} tasks
              </Text>
            </Box>

            <Box>
              <IconButton
                borderRadius="full"
                aria-label="Sign out"
                colorScheme="gray"
                onClick={onSignOut}
                icon={<BiPowerOff />}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    )
  },
)
