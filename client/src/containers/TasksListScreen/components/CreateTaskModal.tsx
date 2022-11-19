import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { CreateTaskForm } from './CreateTaskForm'

interface CreateTaskModalProps {
  onCreateTask: (dto: { title: string; dueDate: string }) => Promise<void>
  isOpen: boolean
  onClose: () => void
}

export const CreateTaskModal = ({
  onCreateTask,
  isOpen,
  onClose,
}: CreateTaskModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx="3">
        <ModalHeader pb={0}>Create a new task</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="5">
          <CreateTaskForm onCreateTask={onCreateTask} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
