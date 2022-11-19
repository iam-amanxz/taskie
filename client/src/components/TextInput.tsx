import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'

interface TextInputProps {
  label: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  placeholder?: string | undefined
  type: React.HTMLInputTypeAttribute | undefined
  isRequired?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  isInvalid?: boolean
  errorMessages?: string[]
  [key: string]: any
}

export const TextInput = ({
  value,
  onChange,
  placeholder,
  type,
  label,
  isRequired,
  showPassword,
  onTogglePassword,
  isInvalid,
  errorMessages,
  ...rest
}: TextInputProps) => {
  switch (type) {
    case 'text':
      return (
        <FormControl
          mb={3}
          isRequired={isRequired}
          {...rest}
          isInvalid={isInvalid}
        >
          <FormLabel>{label}</FormLabel>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {errorMessages?.map((error, index) => (
            <FormErrorMessage key={index}>{error}</FormErrorMessage>
          ))}
        </FormControl>
      )

    case 'password':
      return (
        <FormControl
          mb={3}
          isRequired={isRequired}
          {...rest}
          isInvalid={isInvalid}
        >
          <FormLabel>{label}</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => onTogglePassword && onTogglePassword()}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errorMessages?.map((error, index) => (
            <FormErrorMessage key={index}>{error}</FormErrorMessage>
          ))}
        </FormControl>
      )

    default:
      return <></>
  }
}
