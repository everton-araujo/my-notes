import styled from "styled-components/native";

export const TabArea = styled.View`
  flex-direction: row;
  height: 60px;
  background: #44A4B5;
`;

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  background: #FFF;
  border-radius: 35px;
  border: 3px solid #4EADBE;
`;
