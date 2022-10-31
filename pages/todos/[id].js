import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
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
    const [ title, setTitle ] = React.useState(itemData.title);
    const [ description, setDescription ] = React.useState( itemData.description );
    const [ status, setStatus ] = React.useState( itemData.status );
    const [ docID, setDocID ] = React.useState( itemData.docID );
    const [ isLoading, setIsLoading ] = React.useState(false);

    const toast = useToast();
    // enforce user login
    const { isLoggedIn, user } = useAuth();
    if( !user ) {
        return;
    }

     // handle the update event  operation
    const handleTodoUpdate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to edit a todo",
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
        const todoMain = {
            title: title,
            description: description,
            status: status,
            user: user.uid
        };
        // add a new doc to firestore
        await updateCollectionDoc( collectionNames.todo, docID, todoMain );
        setIsLoading(false);
        // show floaty with status update
        toast(
            {
                title: "todo updated",
                status: "success"
            }
        );
    };

    // valid user
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Text>Title</Text>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Text>Description</Text>
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option
                        value={"pending"}
                        style={{ color: "yellow", fontWeight: "bold" }} >
                            Pending
                    </option>
                    <option
                        value={"completed"}
                        style={{ color: "green", fontWeight: "bold" }} >
                            Completed
                    </option>
                </Select>

                <Button
                    onClick={() => handleTodoUpdate()}
                    disabled={  (title && title.length < 1) || 
                                (description && description.length < 1) || 
                                (status && status.length < 1) ||
                                isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Update Todo
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
    const docRef = doc( db, collectionNames.todo, context.params.id);
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