import {
  Box,
  Card,
  CardBody,
  Flex,
  ListItem,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { BiBellOff } from 'react-icons/bi'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../api/task'
import { useShowToast } from '../../../hooks'
import { Task } from '../../../types'
import { TaskActionMenu } from './TaskActionMenu'

interface TaskItemProps {
  task: Task
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { showErrorToast } = useShowToast()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const handleTaskComplete = async () => {
    try {
      await updateTask({ ...task, completed: true }).unwrap()
    } catch (error) {
      showErrorToast('Failed to complete task')
    }
  }

  const handleTaskUncomplete = async () => {
    try {
      await updateTask({ ...task, completed: false }).unwrap()
    } catch (error) {
      showErrorToast('Failed to activate task')
    }
  }

  const handleTaskDelete = async () => {
    try {
      await deleteTask(task.id).unwrap()
    } catch (error) {
      showErrorToast('Failed to delete task')
    }
  }

  return (
    <ListItem key={task.id} display="flex">
      <Card p={1} size="sm" flex={1} variant="outline" position="relative">
        <Tooltip label="Expired" fontSize="sm">
          <Box
            visibility={task.expired ? 'visible' : 'hidden'}
            p={0.5}
            backgroundColor="red"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100,
            }}
          >
            <BiBellOff color="white" />
          </Box>
        </Tooltip>
        <CardBody>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="sm" wordBreak="break-word">
                {task.title}
              </Text>
              <Text fontSize="xs" wordBreak="break-word" color="gray.500">
                Due at {format(new Date(task.dueDate), 'dd MMM, YYY hh:mm:a')}
              </Text>
            </Box>
            <TaskActionMenu
              completed={task.completed}
              onCompleteTask={handleTaskComplete}
              onUncompleteTask={handleTaskUncomplete}
              onDeleteTask={handleTaskDelete}
            />
          </Flex>
        </CardBody>
      </Card>
    </ListItem>
  )
}
