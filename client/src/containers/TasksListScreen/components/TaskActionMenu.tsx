import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { BiCheck, BiDotsHorizontalRounded, BiX } from 'react-icons/bi'

interface TaskActionMenuProps {
  onCompleteTask: (e: any) => void
  onUncompleteTask: (e: any) => void
  onDeleteTask: (e: any) => void
  completed: boolean
}

export const TaskActionMenu = ({
  onCompleteTask,
  onDeleteTask,
  onUncompleteTask,
  completed,
}: TaskActionMenuProps) => {
  return (
    <Menu arrowPadding={0}>
      <MenuButton
        size="sm"
        borderRadius="full"
        as={IconButton}
        aria-label="Actions"
        icon={<BiDotsHorizontalRounded />}
        variant="outline"
      />
      <MenuList p={0}>
        {!completed ? (
          <MenuItem
            fontSize="sm"
            icon={<BiCheck style={{ fontSize: '20px' }} />}
            onClick={onCompleteTask}
          >
            Mark as completed
          </MenuItem>
        ) : (
          <MenuItem
            fontSize="sm"
            icon={<BiCheck style={{ fontSize: '20px' }} />}
            onClick={onUncompleteTask}
          >
            Mark as active
          </MenuItem>
        )}
        <MenuDivider mt={0} mb={0} />
        <MenuItem
          fontSize="sm"
          icon={<BiX style={{ fontSize: '20px' }} />}
          onClick={onDeleteTask}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
