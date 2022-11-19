import { Button, Card, CardBody, Text } from '@chakra-ui/react'

interface TaskErrorContentProps {
  onRetry: () => void
}

export const TaskErrorContent = ({ onRetry }: TaskErrorContentProps) => {
  return (
    <Card mt={3} size="sm" variant="outline">
      <CardBody fontSize="sm">
        <Text fontSize="sm">Ooops Task fetching failed!</Text>
        <Button mt={2} variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </CardBody>
    </Card>
  )
}
