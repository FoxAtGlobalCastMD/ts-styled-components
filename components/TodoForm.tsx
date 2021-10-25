import styled from "styled-components/native";
import React from "react";
import Button from "./Button";
import Input from "./Input";
import Item, { ItemType } from "./Item";
import { View, Text } from "react-native";
import { FC, useEffect, useState } from "react";
import { getTodos, setItem, updateItem } from "../services/list";

// functionality: fetch, add, delete, mark as complete, edit, filter

// I'd like to extract all this functionality to a Utilities js

export default function TodoForm() {
  const [todos, setTodos] = useState([]); // for the list
  const [value, setValue] = useState(""); // for the input value
  const [trigger, setTrigger] = useState(true);

  // need a way to refresh the data? or is it okay that some is stored in state,
  // and then when the page is refreshed the api call is refreshed?
  // CURRENTLY I'm setting the array of todos. Trigger is no longer used, not calling API to rerender
  useEffect(() => {
    if (trigger) {
      getTodos().then((todos) => {
        setTodos(todos);
        setTrigger(!trigger);
      });
    }
  }, [trigger]);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event?.currentTarget?.value);
    console.log("NEW VALUE: " + value);
  };

  const handleSubmit = () => {
    console.log("SUBMIT WAS PRESSED");
    const date = new Date().getTime();
    const newTodo: ItemType = {
      id: date.toString(),
      title: value,
      complete: false,
      editing: false,
      display: true,
    };

    setItem(newTodo);
    setTodos([...todos, newTodo] as any); // must be 'as any' so that state doesn't complain
    // setTrigger(!trigger);
    setValue(""); // clears the input
    console.log("SetItem");
    console.log(newTodo);
  };

  const handleUpdate = (updatedTodo: ItemType) => {
    const newTodos = todos.map((todo: ItemType) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(newTodos as any);
  };

  const handleCheckBox = (item: ItemType) => {
    const updatedItem = { ...item, complete: !item.complete };
    updateItem(item.id, updatedItem);
    handleUpdate(updatedItem);
    // setTrigger(!trigger); lol still don't need it.
  };

  const clearCompleted = () => {
    const clearedTodos = todos.map((todo: ItemType) => {
      if (todo.complete) {
        const updatedTodo = { ...todo, display: false };
        updateItem(updatedTodo.id, updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(clearedTodos as any);
  };

  const restoreCompleted = () => {
    const restoredTodos = todos.map((todo: ItemType) => {
      if (!todo.display) {
        const updatedTodo = { ...todo, display: true };
        updateItem(updatedTodo.id, updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(restoredTodos as any);
  };

  // visible array allows for empty icon to show up
  const visibleTodos = todos.filter((todo: ItemType) => {
    return todo.display;
  });

  return (
    <FormWrapper>
      <BoldText>It gets and posts data! </BoldText>
      <ItalicText>It even updates it too! </ItalicText>
      <Text>Type in your TODO and press SUBMIT to add it to the list </Text>
      <Input
        value={value}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <ListWrapper>
        {visibleTodos.length > 0 ? (
          visibleTodos.map((todo: ItemType) => (
            <Item key={todo.id} item={todo} handleCheckBox={handleCheckBox} />
          ))
        ) : (
          <Empty />
        )}
      </ListWrapper>
      <Button action={clearCompleted}>Clear Completed</Button>
      <Button action={restoreCompleted}>Restore Completed</Button>
    </FormWrapper>
  );
}

const FormWrapper = styled.View`
  margin: auto;
  margin-top: 30px;
  padding: 2rem;
  background: #f2e9e4;
  border-radius: 5px;
  max-width: 32rem;
  color: #374151;
`;

const ListWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 24px 0;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const ItalicText = styled.Text`
  font-style: italic;
`;

const Empty: FC = (): JSX.Element => {
  return (
    <View>
      <Text>Nothing to see here!</Text>
    </View>
  );
};
