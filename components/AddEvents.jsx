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
import { addEvent } from "../api/events";

// define custom jsx component
const AddEvents = () => {
    // everpy form control (text input) we will associate a react state
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ status, setStatus ] = React.useState("pending");
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
                    title: "you must be logged in to create a todo",
                    status: "error",
                    duration:  9000,
                    isCloseable: true
                }
            );
            return;
        }
        //user logged in
        setIsLoading(true);
        // build an object value template
        const events = {
            title,
            description,
            status,
            startDate,
            endDate,
            userId: user.uid
        };
        // add a new doc to firestore
        await addEvent(events);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
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
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
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
export default AddEvents;