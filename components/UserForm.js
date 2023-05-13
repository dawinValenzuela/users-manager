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
} from '@chakra-ui/react';

function UserForm({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='lastname' isRequired>
            <FormLabel>LastName</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='company' isRequired>
            <FormLabel>Company</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Save
          </Button>
          <Button variant='outline'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserForm;
