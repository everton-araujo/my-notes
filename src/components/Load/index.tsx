import React from 'react';

import loadAnimation from '../../assets/load-animation.json';
import { Container, LoadAnimation } from "./styles";

export function Load() {
  return (
    <Container>
      <LoadAnimation 
        source={loadAnimation}
        autoPlay
      />
    </Container>
  );
}
