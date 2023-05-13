import '@src/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layout';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
