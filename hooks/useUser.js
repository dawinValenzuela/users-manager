import { useEffect } from 'react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useUserContext } from '@src/context/user/UserContext';

export default function useUser() {
  const {
    users,
    deleteUser,
    createUser,
    getUser,
    user,
    clearUser,
    editUser,
    getUsersList,
  } = useUserContext();

  // delete user middleware
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // get users middleware
  const handleGetUsers = async () => {
    setIsLoading(true);
    await getUsersList();
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    const response = await deleteUser(userId);
    setIsLoading(false);

    if (response.status === 'ok') {
      toast({
        title: 'User deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error deleting user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // create user middleware
  const handleCreateUser = async (data) => {
    setIsLoading(true);
    const response = await createUser(data);
    setIsLoading(false);

    toast({
      title: response.message,
      status: response.status === 'ok' ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    users,
    handleDeleteUser,
    handleCreateUser,
    getUser,
    user,
    clearUser,
    editUser,
    isLoading,
  };
}
