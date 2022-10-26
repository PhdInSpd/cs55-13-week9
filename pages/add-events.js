import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddEvents from "../components/AddEvents";

export default function AddEvents2() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddEvents />
        </Container>
    );
};