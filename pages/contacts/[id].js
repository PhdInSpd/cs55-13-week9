import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    VStack,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { collectionNames, updateCollectionDoc } from "../../api/crud";

// single jsx component to show one todo
const ContactItem = ( { itemData } ) => {
    // every form control (text input) we will associate a react state
    const [ firstName, setFirstName ] = React.useState(itemData.firstName);
    const [ lastName, setLastName ] = React.useState( itemData.lastName );
    const [ phone, setPhone ] = React.useState( itemData.phone );
    const [ email, setEmail ] = React.useState( itemData.email );
    const [ docID, setDocID ] = React.useState( itemData.docID );
    const [ isLoading, setIsLoading ] = React.useState(false);

    const toast = useToast();
    // enforce user login
    const { isLoggedIn, user } = useAuth();
    if( !user ) {
        return;
    }

     // handle the update event  operation
    const handleContactUpdate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to edit a contact",
                    status: "error",
                    duration:  1000,
                    isCloseable: true
                }
            );
            return;
        }
        //user logged in
        setIsLoading(true);
        // build an object value template
        const contactMain = {
            firstName: firstName,
            lastName: lastName,
            //status: status,
            phone: phone,
            email: email,
            user: user.uid
        };
        // add a new doc to firestore
        await updateCollectionDoc( collectionNames.contacts, docID, contactMain );
        setIsLoading(false);
        // show floaty with status update
        toast(
            {
                title: "Contacts updated",
                status: "success"
            }
        );
    };

    // valid user
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Text>First Name</Text>
                <Input
                    placeholder="Jose"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <Text>Last Name</Text>
                <Textarea
                    placeholder="Martinez"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <Text>Phone</Text>
                <Textarea
                    placeholder="707 777 7777"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <Text>email</Text>
                <Textarea
                    placeholder="jose@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    onClick={() => handleContactUpdate()}
                    disabled={  (firstName && firstName.length < 1) || 
                                (lastName && lastName.length < 1) || 
                                (phone && phone.length < 1) ||
                                (email && email.length < 1) || 
                                isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Update Contact
                </Button>
            </Stack>
        </Box>
    );
};


// define REQUIRED getServerSideProps() used by Next.js for dynamiclly-routed URL: /todo/[id]
// next.js passes info in context
export async function getServerSideProps( context ) {
    
    let itemData = null;

    // url parameter: context.params.id
    // get a doc from firestore
    const docRef = doc( db, collectionNames.contacts, context.params.id);
    const docSnap = await getDoc( docRef );
    if( docSnap.exists() ) {
        const data = docSnap.data();
        itemData = {
                    docID: docSnap.id,
                    ...data,
                };
    }

    return {
        props: {
            itemData
        }
    };
}

export default ContactItem;