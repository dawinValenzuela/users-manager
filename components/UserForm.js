import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useUser from '@src/hooks/useUser';
import { useEffect } from 'react';
import { useState } from 'react';

const DEFAULT_VALUES = {
  name: '',
  lastName: '',
  email: '',
  company: '',
};

const DEFAULT_TITLE = 'Create user';

function UserForm({ isOpen, onClose }) {
  const [modalTitle, setModalTitle] = useState(DEFAULT_TITLE);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const { handleCreateUser, user, clearUser, editUser } = useUser();

  useEffect(() => {
    if (user) {
      reset(user);
      setModalTitle('Edit user');
    } else {
      setModalTitle(DEFAULT_TITLE);
      reset(DEFAULT_VALUES);
    }
  }, [user, reset]);

  const toast = useToast();

  const onSubmit = (data) => {
    if (user?.id) {
      editUser(data, user.id);
    } else {
      handleCreateUser(data);
    }
    reset(DEFAULT_VALUES);
    onClose();
  };

  const handleCloseModal = () => {
    clearUser();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id='name' isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  placeholder='User name'
                  {...register('name', { required: 'User name is required' })}
                />
                {errors.name && errors.name.message && (
                  <FormErrorMessage>User name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id='lastname' isInvalid={!!errors.lastName}>
                <FormLabel>LastName</FormLabel>
                <Input
                  type='text'
                  placeholder='User lastName'
                  {...register('lastName', {
                    required: 'LastName is required',
                  })}
                />
                {errors.lastName && errors.lastName.message && (
                  <FormErrorMessage>
                    User lastName is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl id='company' isInvalid={!!errors.company}>
                <FormLabel>Company</FormLabel>
                <Input
                  type='text'
                  placeholder='User company'
                  {...register('company', { required: 'Company is required' })}
                />
                {errors.company && errors.company.message && (
                  <FormErrorMessage>User company is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id='email' isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='User email'
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && errors.email.message && (
                  <FormErrorMessage>User email is required.</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Save
            </Button>
            <Button variant='outline' onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default UserForm;
