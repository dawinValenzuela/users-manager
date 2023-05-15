import { useEffect } from 'react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useUserContext } from '@src/context/user/UserContext';

export default function useUser() {
  const { users, deleteUser, createUser, getUser, user, clearUser, editUser } =
    useUserContext();

  return { users, deleteUser, createUser, getUser, user, clearUser, editUser };
}
