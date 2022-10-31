import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    Link,
    useState,
    useToast,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { 
    collection,
    onSnapshot,
    query,
    where
 } from "firebase/firestore";

import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { collectionNames, deleteCollectionDoc, updateCollectionDocFields } from "../api/crud";
    
const ContactsList = () => {
    const [ contacts, setContacts] = React.useState([]);
    const {  user } = useAuth();    
    // const [toastMessage, setToastMessage] = useState(undefined);
    const toast = useToast();
    
    // update ui with refreshData
    useEffect(
        () => {
            // update the list from firestore data
            if (!user) {
                setContacts([]);
                // toast(
                //     {
                //         title: "you must be logged in to show event list",
                //         status: "error",
                //         duration:  5000,
                //         isCloseable: true
                //     }
                // );
                console.log( "you must be logged in to show contacts list" );
                return;
            }
            // USER logged in
            const q = query( 
                collection( db, collectionNames.contacts),
                where("user", "==", user.uid));
            // query is async, setup event handler with firebase
            onSnapshot( 
                q,
                (querySnapshot) => {
                    let ar = [];
                    querySnapshot.docs.forEach( (doc) => {
                        ar.push(
                            { 
                                id: doc.id,
                                ...doc.data() 
                            });
                    });
                    setContacts(ar);
                }
            );
        },
        [user/*, toastMessage, toast*/]
    );
    const handleContactDelete = async (id/*doc id*/) => {
        if ( confirm("Are you sure you wanna delete this contact?") ) {
            deleteCollectionDoc( collectionNames.contacts, id);
            toast(
                { 
                    title: "Contact deleted successfully",
                    status: "success" 
                });
        }
    };   

    return (
    <Box mt={5}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {   contacts &&
                contacts.map( 
                    (contact) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }} 
                            key={contact.id} >
                                <Heading as="h3" fontSize={"xl"}>                                    
                                    <Link href={"./contacts/"+contact.id} display="flex"> <FaEdit/> { `Name: ${contact.firstName} ${contact.lastName} `} </Link>                                     
                                    <Badge
                                        color="red.500"
                                        bg="inherit"
                                        transition={"0.2s"}
                                        _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                        }}
                                        float="right"
                                        size="xs"
                                        onClick={() => handleContactDelete(contact.id)} >
                                            <FaTrash />
                                    </Badge>
                                </Heading>
                                <Text>
                                    Phone: {contact.phone}                                     
                                </Text>
                                <Text>
                                    Email: {contact.email}                                      
                                </Text>
                        </Box>
                    )
                )
            }
        </SimpleGrid>
    </Box>
    );
};
export default ContactsList;