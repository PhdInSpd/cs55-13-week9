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
//  from api
import { collectionNames, addCollectionDoc } from "../api/crud";

// define custom jsx component
const AddTodo = () => {
    // everpy form control (text input) we will associate a react state
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ status, setStatus ] = React.useState("pending");
    const [ isLoading, setIsLoading ] = React.useState(false);
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    // handle the add todo operation
    const handleTodoCreate =  async () => {
        if( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "you must be logged in to create a todo",
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
        await addCollectionDoc( collectionNames.todo, todoMain);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        // show floaty with status update
        toast(
            {
                title: "To do created",
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
                    onClick={() => handleTodoCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    colorScheme="teal"
                    variant="solid" >
                        Add Todo
                </Button>
            </Stack>
        </Box>
    );

};

// export
export default AddTodo;