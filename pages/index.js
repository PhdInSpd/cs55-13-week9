import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import EventsList from "../components/EventsList";
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <EventsList />
    </Container>
  );
};