import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodosList from "../components/TodosList";
export default function TodosListJS() {
  return (
    <Container maxW="7xl">
      <Auth />
      <TodosList />
    </Container>
  );
};