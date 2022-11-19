import { Badge, Box, List } from '@chakra-ui/react'
import { Task } from '../../../types'
import { TaskEmptyContent } from './TaskEmptyContent'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  label: string
  type: 'active' | 'completed'
  tasks: Task[]
}

export const TaskList = ({ label, tasks, type }: TaskListProps) => {
  return (
    <Box>
      <Badge
        colorScheme={type === 'active' ? 'green' : 'blue'}
        alignSelf="start"
      >
        {`${label} (${tasks.length})`}
      </Badge>
      {tasks?.length === 0 && <TaskEmptyContent type={type} />}
      <List spacing={2} marginBlock={3}>
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </Box>
  )
}
