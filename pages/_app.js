import '@src/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layout';
import { UserProvider } from '@src/context/user/UserContext';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps, session }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
