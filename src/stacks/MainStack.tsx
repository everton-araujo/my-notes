import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from "../pages/SplashScreen";
import { Home } from "../pages/Home";
import { MainTab } from "./MainTab";

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='MainTab' component={MainTab} />
    </Stack.Navigator>
  );
}
