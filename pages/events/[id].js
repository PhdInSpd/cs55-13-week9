import React from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

// single jsx component to show one todo
const EventItem = ({ itemData}) => {
    // enforce user login
    const { user } = useAuth() || {};
    if( !user ) {
        return;
    }
    // valid user
    return (
        <Box mt={5}>
            <Heading as={"h3"} fontSize={"xl"}>
                Title: { itemData.title }
            </Heading>
            <Text>
                Description: { itemData.description }
            </Text>
            <Text>
                Status: { itemData.status }
            </Text>
            <Text>
                StateDate: { itemData.startDate }
            </Text>
            <Text>
                EndDate: { itemData.endDate }
            </Text>
        </Box>
    );
};


// define REQUIRED getServerSideProps() used by Next.js for dynamiclly-routed URL: /todo/[id]
// next.js passes info in context
export async function getServerSideProps( context ) {
    
    let itemData = null;

    // url parameter: context.params.id
    // get a doc from firestore
    const docRef = doc( db, "events", context.params.id);
    const docSnap = await getDoc( docRef );
    if( docSnap.exists() ) {
        itemData = docSnap.data();
    }

    return {
        props: {
            itemData
        }
    };
}

export default EventItem;