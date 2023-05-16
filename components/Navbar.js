import { Flex, Button } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      bg='gray.500'
      w='100%'
      p={4}
      color='white'
      mb={5}
    >
      Users Manager
      {session?.user?.email && (
        <Button colorScheme='teal' ml={5} onClick={() => signOut()}>
          Sign out
        </Button>
      )}
    </Flex>
  );
}

export default Navbar;
