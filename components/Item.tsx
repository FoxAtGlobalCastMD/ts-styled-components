import React, { FC } from "react";
import styled from "styled-components/native";
import { CheckBoxInput } from "./Input";

export type ItemType = {
  id: string;
  title: string;
  complete: boolean;
  display?: boolean;
  editing?: boolean;
};

export interface ItemProps {
  item: ItemType;
  handleCheckBox: Function;
}

// This is still a functional component.
// We are able to type things out better with TS using const
const Item: FC<ItemProps> = ({ item, handleCheckBox }): JSX.Element => {
  return (
    <>
      {item.display && (
        <StyledItem>
          <CheckBoxInput
            checked={item.complete ? true : false}
            handleOnChange={() => {
              console.log("onchange!");
              handleCheckBox(item);
            }}
          />
          <ListItem complete={item.complete}>{item.title}</ListItem>
        </StyledItem>
      )}
    </>
  );
};

export default Item;

const StyledItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: #4a4e69 solid 1px;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
`;

type ListItemType = {
  complete?: boolean;
};

const ListItem = styled.Text`
  font-size: 18px;
  flex-grow: 2;
  margin-left: 8px;
  text-decoration: ${(props: ListItemType) =>
    props.complete ? "line-through" : "none"};
`;
