import React from "react";

import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,    
} from "@chakra-ui/react";

// bring in useAuth from our hooks
import useAuth from "../hooks/useAuth";
// addTodo from api
import { collectionNames, addCollectionDoc } from "../api/crud";


// define custom jsx component
const AddContact = () => {
    // everpy form control (text input) we will associate a react state
    const [ firstName, setFirstName ] = React.useState("");
    const [ lastName, setLastName ] = React.useState("");
    const [ phone, setPhone ] = React.useState("");
    const [ email, setEmail]  = React.useState("");

    const [ isLoading, setIsLoading ] = React.useState(false);
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    // handle the add todo operation
    const handleContactCreate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to create a CONTACT",
                    status: "error",
                    duration:  5000,
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
            phone: phone,
            email: email,
            user: user.uid
        };
        // add a new doc to firestore
        await addCollectionDoc( collectionNames.contacts, contactMain );
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");

        // show floaty with status update
        toast(
            {
                title: `Contact ${contactMain.firstName} ${contactMain.lastName} created`,
                status: "success"
            }
        );
    };

    return (
        <Box w={{base: "90%", md:"80%", lg:"60%"}} margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Textarea
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Textarea
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Textarea
                    placeholder="707-777-7777"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Textarea
                    placeholder="jose@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    onClick={() => handleContactCreate()}
                    disabled={firstName.length < 1 || lastName.length < 1 || phone.length < 1 || email.length < 1 || isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Add Contact
                </Button>
            </Stack>
        </Box>
    );
};

// export
export default AddContact;