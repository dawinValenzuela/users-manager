import React from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { getSession, signIn } from 'next-auth/react';

function Login() {
  return (
    <Flex flexDir='column' alignItems='center'>
      <Heading>Login</Heading>
      <Text mb={5}>Log in to your account</Text>
      <Box>
        <Button onClick={() => signIn()}>Login with google</Button>
      </Box>
    </Flex>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/user' },
    };
  }

  return {
    props: {},
  };
}
