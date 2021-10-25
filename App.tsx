import React from "react";
import styled from "styled-components/native";
import TodoForm from "./components/TodoForm";

export default function App() {
  return (
    <Container>
      <InnerText>Basic To-Do List</InnerText>
      <TodoForm></TodoForm>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #c9ada7;
  align-items: center;
  justify-content: center;
`;

const InnerText = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;
