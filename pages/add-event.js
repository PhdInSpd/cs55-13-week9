import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddEvent from "../components/AddEvent";

export default function AddEventJS() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddEvent />
        </Container>
    );
};