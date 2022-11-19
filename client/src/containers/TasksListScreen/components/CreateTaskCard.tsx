import { Card, CardBody, CardHeader, GridItem, Heading } from '@chakra-ui/react'
import { CreateTaskForm } from './CreateTaskForm'

interface CreateTaskCardProps {
  onCreateTask: (dto: { title: string; dueDate: string }) => Promise<void>
}

export const CreateTaskCard = ({ onCreateTask }: CreateTaskCardProps) => {
  return (
    <Card size="sm" variant="outline" alignSelf="start">
      <CardHeader>
        <Heading size="md">Create a new task</Heading>
      </CardHeader>
      <CardBody>
        <CreateTaskForm onCreateTask={onCreateTask} />
      </CardBody>
    </Card>
  )
}
