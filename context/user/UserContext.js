import { createContext, useContext, useEffect, useReducer } from 'react';
import userReducer from './UserReducer';
import { GET_USERS, GET_USER, CLEAR_USER } from './UserTypes';
import {
  fetchUsers,
  deleteUserClient,
  createUserClient,
  getUserClient,
  editUserClient,
} from '@src/client';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const initialState = {
  users: [],
  user: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsersList = async () => {
    const users = await fetchUsers();
    dispatch({ type: GET_USERS, payload: users });
  };

  const deleteUser = async (userId) => {
    const response = await deleteUserClient(userId);
    getUsersList();
  };

  const createUser = async (data) => {
    const response = await createUserClient(data);
    getUsersList();
  };

  const editUser = async (data, userId) => {
    const response = await editUserClient(data, userId);
    getUsersList();
  };

  const getUser = async (userId) => {
    const user = await getUserClient(userId);
    dispatch({ type: GET_USER, payload: user });
  };

  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, deleteUser, createUser, getUser, clearUser, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
