import React, { FC } from "react";
import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  action: (event: GestureResponderEvent) => void;
}
// we need an action
// first action idea is to clear all completed

const Button: FC<ButtonProps> = ({ action, children }): JSX.Element => {
  return (
    <BasicButton onPress={action}>
      <BasicButtonText>{children}</BasicButtonText>
    </BasicButton>
  );
};

const BasicButton = styled.TouchableOpacity`
  background: #22223b;
  border: 1px solid #9a8c98;
  padding: 6px;
  border-radius: 5px;
`;

const BasicButtonText = styled.Text`
  color: #9a8c98;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

export default Button;
