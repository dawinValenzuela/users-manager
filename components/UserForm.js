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

function UserForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data) => {
    // TODO: Add user to database
    try {
      const response = await fetch(
        'http://localhost:3000/api/admin_list_active_users',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: 'User created.',
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
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
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
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default UserForm;
