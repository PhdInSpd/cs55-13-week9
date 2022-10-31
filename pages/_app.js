//import '../styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react";
import MainNavBar from "../components/MainNavBar";

function MyApp({ Component, pageProps }) {
  return (
        <ChakraProvider>
          <MainNavBar/>
          <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp
