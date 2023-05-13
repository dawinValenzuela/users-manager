import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton, HStack } from '@chakra-ui/react';

export default function TableActions({ onEdit, onDelete }) {
  return (
    <HStack spacing={2}>
      <IconButton
        size='sm'
        colorScheme='yellow'
        aria-label='Edit'
        icon={<EditIcon />}
        onClick={onEdit}
      />
      <IconButton
        size='sm'
        colorScheme='red'
        aria-label='Delete'
        icon={<DeleteIcon />}
        onClick={onDelete}
      />
    </HStack>
  );
}
