import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomTabBar } from "../components/CustomTabBar";
import { Home } from "../pages/Home";
import VoiceRecorder from "../pages/VoiceRecorder";
import { Notes } from "../pages/Notes";

const Tab = createBottomTabNavigator();

export function MainTab() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='VoiceRecorder' component={VoiceRecorder} />
      <Tab.Screen name='Notes' component={Notes} />
    </Tab.Navigator>
  );
}
