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
import { getSession } from 'next-auth/react';
import UsersTable from '@src/components/UsersTable';

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
        <UsersTable
          users={users}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenAlert}
        />
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

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  return {
    props: {},
  };
}
