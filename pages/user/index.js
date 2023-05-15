//Show all users in a table using chakra-ui
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import CreateUserButton from '@src/components/CreateUserButton';
import TableActions from '@src/components/TableActions';
import UserForm from '@src/components/UserForm';
import Alert from '@src/components/Alert';
import { useState } from 'react';
import useUser from '@src/hooks/useUser';

export default function Users() {
  const { users, handleDeleteUser, getUser, userToEdit, isLoading } = useUser();
  const [selectedUser, setSelectedUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const handleDelete = () => {
    handleDeleteUser(selectedUser);
    onCloseAlert();
  };

  const handleOpenAlert = (userId) => {
    setSelectedUser(userId);
    onOpenAlert();
  };

  const handleOpenEditModal = (userId) => {
    onOpen();
    getUser(userId);
  };

  return (
    <>
      <CreateUserButton onClick={onOpen} />
      {isLoading ? (
        <Flex width='full' justifyContent='center'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      ) : (
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Active Users</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Empresa</Th>
              <Th>Email</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, key) => (
              <Tr key={user.id}>
                <Td>{key + 1}</Td>
                <Td>{user.name}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.company}</Td>
                <Td>{user.email}</Td>
                <Td>
                  {
                    <TableActions
                      onEdit={() => handleOpenEditModal(user.id)}
                      onDelete={() => handleOpenAlert(user.id)}
                    />
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <UserForm isOpen={isOpen} onClose={onClose} user={userToEdit} />
      <Alert
        isOpen={isAlertOpen}
        onClose={onCloseAlert}
        onDelete={handleDelete}
      />
    </>
  );
}
