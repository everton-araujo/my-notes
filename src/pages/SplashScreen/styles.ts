import styled from "styled-components/native";
import LottieView from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  background: #63C2D1;
`;

export const Title = styled.Text`
  font-size: 44px;
  font-weight: bold;
  margin-top: 56px;
  color: #FFF;
`;

export const LoadAnimation = styled(LottieView)`
  margin-top: -6%;
`;  

export const LoadContainer = styled.View`
  margin-bottom: -250px;
`;
