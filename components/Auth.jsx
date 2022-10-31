import React from "react";

import { 
    Box,
    Button,
    Link,
    Text,
    VStack,
    useColorMode 
} from "@chakra-ui/react";

import { 
    signInWithPopup,
    GoogleAuthProvider
 } from "firebase/auth";

import {
    FaGoogle,
    FaMoon,
    FaSun
} from "react-icons/fa";

import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth();
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(
                (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            })
            .catch(
                (error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
                <VStack>
                    <Link href="/add-todo">Add Todo</Link>
                    <Link href="/todos-list">List All Todos</Link>
                </VStack>
            </Box>
            <Box>
                <VStack>
                    <Link href="/add-event">Add Event</Link>
                    <Link href="/">List All Event</Link>
                </VStack>                
            </Box>
            <Box>
                <VStack>
                    <Link href="/add-contact">Add Contact</Link>
                    <Link href="/contacts-list">List All Contacts</Link>
                </VStack>                
            </Box>
    
            <Box textAlign="right">
                <Button 
                    onClick={() => toggleColorMode()}>
                        {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                </Button>
                {" "}
                {isLoggedIn && (
                    <>
                        <Text color="green.500">{user.email}</Text>
                        <Link color="red.500" onClick={() => auth.signOut()}>
                            Logout
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                        Login with Google
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default Auth;