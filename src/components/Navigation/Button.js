import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  font-size: 18px;  
  color: #696969;
  background: #FFFF00;
  border-bottom: 1px;
  border-right: 1px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-family: 'Baloo Bhaijaan', cursive;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background: #87CEEB;
    color: #FFFF00;
  }
`;