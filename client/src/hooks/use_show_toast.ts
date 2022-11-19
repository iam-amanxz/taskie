import { useToast } from '@chakra-ui/react'

export const useShowToast = () => {
  const toast = useToast()

  const showErrorToast = (message: string) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  const showSuccessToast = (message: string) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  return { showErrorToast, showSuccessToast, toast }
}
