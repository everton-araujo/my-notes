import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Load } from "../../components/Load";

import loadAnimation from '../../assets/splash-screen.json';
import { Container, Title, LoadAnimation, LoadContainer } from "./styles";

export function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainTab');
    }, 3000);
  }, []);

  return (
    <Container>
      <Title>My notes</Title>

      <LoadAnimation
        source={loadAnimation}
        autoPlay
      />

      <LoadContainer>
        <Load />
      </LoadContainer>
    </Container>
  );
}
