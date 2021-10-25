import React, { FC } from "react";
import styled from "styled-components/native";
import Checkbox from "expo-checkbox";
import Button from "./Button";
import { GestureResponderEvent } from "react-native";

interface TodoInputProps {
  value: string;
  handleInput: Function;
  handleSubmit: (event: GestureResponderEvent) => void;
}

const Input: FC<TodoInputProps> = ({ value, handleInput, handleSubmit }) => {
  return (
    <>
      <BasicInput
        placeholder="Add new item"
        value={value}
        onChange={(event: any) => {
          handleInput(event);
        }}
      />
      <Button action={handleSubmit}>SUBMIT</Button>
    </>
  );
};

// do you really have to handle state of blur/focus with state?
// and change styles like that?
const BasicInput = styled.TextInput`
  border: none;
  padding: 14px;
  font-size: 16px;
  margin-top: 16px;
  border: #9a8c98 1px solid;
  border-radius: 4px;
  margin-bottom: 8px;
`;

interface CheckBoxInputProps {
  handleOnChange: () => void;
  checked: boolean;
}

const CheckBoxInput: FC<CheckBoxInputProps> = ({
  handleOnChange,
  checked,
}): JSX.Element => {
  return <Checkbox value={checked} onValueChange={handleOnChange} />;
};

export default Input;
export { CheckBoxInput };
