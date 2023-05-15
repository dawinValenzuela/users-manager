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
  useToast,
} from '@chakra-ui/react';
import CreateUserButton from '@src/components/CreateUserButton';
import TableActions from '@src/components/TableActions';
import UserForm from '@src/components/UserForm';
import Alert from '@src/components/Alert';
import { useState } from 'react';

export default function Users({ users }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState();
  const {
    isOpen: isAlertOpen,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const toast = useToast();

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/admin_delete_user/${selectedUser}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: 'User deleted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Something went wrong`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      onCloseAlert();
    }
  };

  const handleOpenAlert = (userId) => {
    setSelectedUser(userId);
    onOpenAlert();
  };

  return (
    <>
      <CreateUserButton onClick={onOpen} />
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
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.company}</Td>
              <Td>{user.email}</Td>
              <Td>
                {
                  <TableActions
                    onEdit={onOpen}
                    onDelete={() => handleOpenAlert(user.id)}
                  />
                }
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UserForm isOpen={isOpen} onClose={onClose} />
      <Alert
        isOpen={isAlertOpen}
        onClose={onCloseAlert}
        onDelete={handleDelete}
      />
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3000/api/admin_list_active_users');
  const users = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
}
