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
const EventItem = ( { itemData } ) => {
    // every form control (text input) we will associate a react state
    const [ title, setTitle ] = React.useState(itemData.title);
    const [ description, setDescription ] = React.useState( itemData.description );
    const [ startDate, setStartDate ] = React.useState( itemData.startDate );
    const [ endDate, setEndDate ] = React.useState( itemData.endDate );
    const [ docID, setDocID ] = React.useState( itemData.docID );
    const [ isLoading, setIsLoading ] = React.useState(false);

    const toast = useToast();
    // enforce user login
    const { isLoggedIn, user } = useAuth();
    if( !user ) {
        return;
    }

     // handle the update event  operation
    const handleEventUpdate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to edit an EVENT",
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
        const eventMain = {
            title: title,
            description: description,
            //status: status,
            startDate: startDate,
            endDate: endDate,
            user: user.uid
        };
        // add a new doc to firestore
        await updateCollectionDoc( collectionNames.events, docID, eventMain );
        setIsLoading(false);
        // show floaty with status update
        toast(
            {
                title: "Event updated",
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

                <Text>Start Date</Text>
                <Textarea
                    placeholder="StartDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <Text>End Date</Text>
                <Textarea
                    placeholder="EndDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                    onClick={() => handleEventUpdate()}
                    disabled={  (title && title.length < 1) || 
                                (description && description.length < 1) || 
                                (startDate && startDate.length < 1) ||
                                (endDate && endDate.length < 1) || 
                                isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Update Event
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
    const docRef = doc( db, collectionNames.events, context.params.id);
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

export default EventItem;