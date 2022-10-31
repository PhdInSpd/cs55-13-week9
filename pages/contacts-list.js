import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import ContactsList from "../components/ContactsList";
export default function ContactsListJS() {
  return (
    <Container maxW="7xl">
      <Auth />
      <ContactsList />
    </Container>
  );
};