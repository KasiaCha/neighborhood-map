import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  font-family: 'Baloo Bhaijaan', cursive;
  color: #696969;
  background: #87CEEB;
  border-bottom: 1px;
  border-right: 1px;
  margin: 2px;
  padding: 14px;
  border-radius: 8px;
  transition: all 0.5s;
  &:hover {
    background: #FFFF00;
    cursor: pointer;
    color: #696969;
  }
`;


