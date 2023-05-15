import '@src/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layout';
import { UserProvider } from '@src/context/user/UserContext';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}
