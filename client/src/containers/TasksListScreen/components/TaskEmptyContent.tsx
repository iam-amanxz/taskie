import { Card, CardBody } from '@chakra-ui/react'

interface TaskEmptyContentProps {
  type: 'active' | 'completed'
}

export const TaskEmptyContent = ({ type }: TaskEmptyContentProps) => {
  return (
    <Card mt={3} size="sm" variant="outline">
      <CardBody fontSize="sm">
        There are no {type} tasks. Kind reminder to stay hydrated 😇
      </CardBody>
    </Card>
  )
}
