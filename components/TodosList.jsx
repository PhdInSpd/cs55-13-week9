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

const TodosList = () => {
    const [ todos, setTodos] = React.useState([]);
    const {  user } = useAuth();
    // const [toastMessage, setToastMessage] = useState(undefined);
    const toast = useToast();

    // update ui with refreshData
    useEffect(
        () => {

            // update the list from firestore data
            if (!user) {
                setTodos([]);

                // toast(
                //     {
                //         title: "you must be logged in to show todos",
                //         status: "error",
                //         duration:  5000,
                //         isCloseable: true
                //     }
                // );
                console.log( "you must be logged in to show todos" );
                return;
            }
            // USER logged in
            const q = query( 
                collection( db, collectionNames.todo ),
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
                    setTodos(ar);
                }
            );
        },
        [user/*, toastMessage, toast*/]
    );
    const handleTodoDelete = async (id/*doc id*/) => {
        if ( confirm("Are you sure you wanna delete this todo?") ) {
            deleteCollectionDoc( collectionNames.todo, id);
            toast(
                { 
                    title: "Todo deleted successfully",
                    status: "success" 
                });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await updateCollectionDocFields(  
            collectionNames.todo,
            id,
            {
                status: newStatus,
            });
        toast({
            title: `Todo marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };

    return (
    <Box mt={5}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {   todos &&
                todos.map( 
                    (todo) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }} 
                            key={todo.id} >
                                <Heading as="h3" fontSize={"xl"}>
                                <Link href={"./todos/"+todo.id} display="flex"> <FaEdit/> {todo.title}{" "} </Link>                                    
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
                                        onClick={() => handleTodoDelete(todo.id)} >
                                            <FaTrash />
                                    </Badge>
                                    <Badge
                                        color={todo.status == "pending" ? "gray.500" : "green.500"}
                                        bg="inherit"
                                        transition={"0.2s"}
                                        _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                        }}
                                        float="right"
                                        size="xs"
                                        onClick={() => handleToggle(todo.id, todo.status)} >
                                            {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                    </Badge>
                                    <Badge
                                        float="right"
                                        opacity="0.8"
                                        bg={todo.status == "pending" ? "yellow.500" : "green.500"} >
                                            {todo.status}
                                    </Badge>
                                </Heading>
                                <Text>
                                    {todo.description}                                    
                                </Text>
                        </Box>
            ))
            }
        </SimpleGrid>
    </Box>
    );
};
export default TodosList;