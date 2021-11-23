import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import { TabArea, TabItem, TabItemCenter } from "./styles";

export function CustomTabBar({ state, navigation }) {
  function navigateTo(pageName: string) {
    navigation.navigate(pageName);
  }

  return (
    <TabArea>
      <TabItem onPress={() => navigateTo('VoiceRecorder')}>
        <Icon
          name='microphone'
          size={24}
          style={{
            opacity: state.index === 1 ? 1 : 0.5,
            color: '#FFF'
          }}
        />
      </TabItem>

      <TabItemCenter
        onPress={() => navigateTo('Home')}
        style={{
          backgroundColor: state.index === 0 ? '#CDF2F9' : '#FFF',
          borderColor: state.index === 0 ? '#D9DFeB' : '#4EADBE'
        }}
      >
        <Icon
          name='home'
          size={34}
          style={{
            color: state.index === 0 ? '#62656B' : '#000',
          }}
        />
      </TabItemCenter>

      <TabItem onPress={() => navigateTo('Notes')}>
        <Icon
          name='file-text-o'
          size={24}
          style={{
            opacity: state.index === 2 ? 1 : 0.5,
            color: '#FFF'
          }}
        />
      </TabItem>
    </TabArea>
  );
}
