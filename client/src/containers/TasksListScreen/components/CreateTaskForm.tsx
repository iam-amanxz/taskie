import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { DateInput, TextInput } from '../../../components'

interface CreateTaskFormProps {
  onCreateTask: (dto: { title: string; dueDate: string }) => Promise<void>
}

export const CreateTaskForm = ({ onCreateTask }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(new Date())

  return (
    <>
      <TextInput
        isRequired
        type="text"
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <DateInput
        isRequired
        label="Due Date"
        selected={dueDate}
        onChange={(date: Date) => {
          if (!date) {
            return setDueDate(new Date())
          }
          setDueDate(date)
        }}
      />

      <Button
        disabled={!title.trim() || !dueDate}
        mt={5}
        w="full"
        variant="solid"
        colorScheme="whatsapp"
        onClick={async () => {
          if (!title.trim()) return
          await onCreateTask({ title, dueDate: dueDate.toISOString() })
          setTitle('')
          setDueDate(new Date())
        }}
      >
        Create
      </Button>
    </>
  )
}
