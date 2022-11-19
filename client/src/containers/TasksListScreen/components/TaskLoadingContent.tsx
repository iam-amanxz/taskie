import { Skeleton, Stack } from '@chakra-ui/react'

export const TaskLoadingContent = () => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" w="90%" />
      <Skeleton height="20px" w="80%" />
    </Stack>
  )
}
