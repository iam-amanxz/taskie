import {
  Box,
  Button,
  Container,
  Show,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useFetchUserProfileQuery } from '../../api/auth'
import { useCreateTaskMutation, useFetchAllTasksQuery } from '../../api/task'
import { PATH_LOGIN } from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../store'
import { authStateResetAction, logoutAction } from '../../store/session/actions'
import { ErrorResponseResource } from '../../types'
import { useLocalStorage, useShowToast } from '../../hooks'
import {
  selectAllActiveTasks,
  selectAllCompletedTasks,
  selectAllTasks,
  selectUser,
} from '../../store/selectors'
import { TaskList } from './components/TaskList'
import { TaskHeader } from './components/TaskHeader'
import { TaskLoadingContent } from './components/TaskLoadingContent'
import { TaskErrorContent } from './components/TaskErrorContent'
import { CreateTaskCard } from './components/CreateTaskCard'
import { CreateTaskModal } from './components/CreateTaskModal'
import { BiPlus } from 'react-icons/bi'
import { LOCAL_STORAGE_KEY } from '../../constants/app'

export const TasksListScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { showErrorToast, showSuccessToast } = useShowToast()
  const user = useFetchUserProfileQuery()
  const task = useFetchAllTasksQuery()
  const [createTask, createTaskResult] = useCreateTaskMutation()
  const activeTasks = useAppSelector(selectAllActiveTasks)
  const completedTasks = useAppSelector(selectAllCompletedTasks)
  const allTasks = useAppSelector(selectAllTasks)
  const selectedUser = useAppSelector(selectUser)
  const { remove } = useLocalStorage()

  const handleSignOut = () => {
    dispatch(logoutAction())
    navigate(PATH_LOGIN)
  }

  const handleCreateTask = async ({
    title,
    dueDate,
  }: {
    title: string
    dueDate: string
  }) => {
    try {
      await createTask({ title, dueDate }).unwrap()
      if (isOpen) {
        onClose()
      }
      showSuccessToast('Task created successfully')
    } catch (error) {
      showErrorToast(
        (createTaskResult.error as ErrorResponseResource).errorMessage ?? '',
      )
    }
  }

  if (user.isError) {
    remove(LOCAL_STORAGE_KEY)
    dispatch(logoutAction)
    showErrorToast('Something went wrong')
    return <Navigate to={PATH_LOGIN} replace />
  }

  const renderTasklist = useCallback(
    (component: JSX.Element) => {
      if (task.isLoading) {
        return <TaskLoadingContent />
      }
      if (task.isError) {
        return <TaskErrorContent onRetry={task.refetch} />
      }
      return component
    },
    [task],
  )

  return (
    <Box position="relative">
      <TaskHeader
        username={selectedUser?.name ?? ''}
        tasksCount={allTasks.length}
        onSignOut={handleSignOut}
      />

      <Container maxW="6xl" mt="4">
        <SimpleGrid columns={[1, 2, 3]} spacing="4">
          {renderTasklist(
            <TaskList tasks={activeTasks} label="Active Tasks" type="active" />,
          )}
          {renderTasklist(
            <TaskList
              tasks={completedTasks}
              label="Completed Tasks"
              type="completed"
            />,
          )}
          <Show breakpoint="(min-width: 768px)">
            <CreateTaskCard onCreateTask={handleCreateTask} />
          </Show>
        </SimpleGrid>
      </Container>

      <Show breakpoint="(max-width: 767px)">
        <CreateTaskModal
          onCreateTask={handleCreateTask}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Show>
      <Box position="fixed" style={{ right: 15, bottom: 25 }}>
        <Show breakpoint="(max-width: 767px)">
          <Button
            leftIcon={<BiPlus style={{ fontSize: '20px' }} />}
            rounded="full"
            variant="solid"
            colorScheme="whatsapp"
            onClick={onOpen}
          >
            Create
          </Button>
        </Show>
      </Box>
    </Box>
  )
}
