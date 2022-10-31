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
const AddEvent = () => {
    // every form control (text input) we will associate a react state
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ startDate, setStartDate ] = React.useState( "" );
    const [ endDate, setEndDate ] = React.useState( "" );
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    // handle the add todo operation
    const handleEventsCreate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to create an EVENT",
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
        await addCollectionDoc( collectionNames.events, eventMain );
        setIsLoading(false);
        setTitle("");
        setDescription("");
        //setStatus("pending");
        setStartDate( "" );
        setEndDate( "" );
        // show floaty with status update
        toast(
            {
                title: "Events created",
                status: "success"
            }
        );
    };

    return (
        <Box w={{base: "90%", md:"80%", lg:"60%"}} margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Textarea
                    placeholder="StartDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Textarea
                    placeholder="EndDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                    onClick={() => handleEventsCreate()}
                    disabled={title.length < 1 || description.length < 1 || startDate.length < 1 || endDate.length < 1 || isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Add Event
                </Button>
            </Stack>
        </Box>
    );
};

// export
export default AddEvent;