import { FormControl, FormLabel, InputGroup } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date_picker.css'

interface DateInputProps {
  label: string
  onChange(
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
  ): void
  isRequired?: boolean
  selected: Date | null
}

const filterTime = (date: Date) => {
  const isPastTime = new Date().getTime() > date.getTime()
  return !isPastTime
}

export const DateInput = ({
  onChange,
  label,
  isRequired,
  selected,
}: DateInputProps) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <InputGroup border="1px" borderColor="gray.200" p={2} borderRadius="md">
        <DatePicker
          minDate={new Date()}
          selected={selected}
          filterTime={filterTime}
          onChange={onChange}
          wrapperClassName="datePicker"
          showTimeSelect
        />
      </InputGroup>
    </FormControl>
  )
}
