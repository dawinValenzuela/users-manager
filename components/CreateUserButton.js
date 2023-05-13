import { Button } from '@chakra-ui/react';

export default function CreateUserButton({ onClick }) {
  return (
    <Button colorScheme='blue' mb={5} onClick={onClick}>
      New User
    </Button>
  );
}
