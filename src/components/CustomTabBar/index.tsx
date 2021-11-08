import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import { TabArea, TabItem, TabItemCenter } from "./styles";

export function CustomTabBar(state: any, navigation: any) {
  const goTo = (pageName: any) => {
    navigation.navigate(pageName);
  }

  return (
    <TabArea>
      <TabItem onPress={() => goTo('VoiceRecorder')}>
        <Icon
          name='microphone'
          size={24}
          style={{ 
            opacity: state.index === 1 ? 1 : 0.5,
            color: '#FFF'
          }}
        />
      </TabItem>

      <TabItemCenter>
        <Icon
          name='home'
          size={24}
          style={{
            backgroundColor: state.index === 0 ? '#CDF2F9' : '#FFF',
            borderColor: state.index === 0 ? '#D3D3D3' : '#4EADBE'
          }}
          onPress={() => goTo('Home')}
        />
      </TabItemCenter>

      <TabItem onPress={() => goTo('Notes')}>
        <Icon
          name='file-text-o'
          size={24}
          style={{ 
            opacity: state.index === 1 ? 1 : 0.5,
            color: '#FFF'
          }}
        />
      </TabItem>
    </TabArea>
  );
}
