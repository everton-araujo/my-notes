import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #455A64;
`;

export const TitleText = styled.Text`
  margin-top: 100px;
  font-size: 28px;
  color: #FFF;
`;

export const TextRecordCounter = styled.Text`
  margin-top: 32px;
  color: #FFF;
  font-size: 20px;
  letter-spacing: 3px;
`;

export const ViewRecorder = styled.View`
  margin-top: 40px;
  width: 100%;
  align-items: center;
`;

export const RecordButtonWrapper = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  margin: 12px;
  border-width: 1px;
  border-color: #FFF;
  width: 65px;
  height: 35px;
  justify-content: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  align-self: center;
  color: #FFF;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ViewPlayer = styled.View`
  margin-top: 60px;
  align-self: stretch;
  align-items: center;
`;

export const ViewBarWrapper = styled.TouchableOpacity`
  margin-top: 28px;
  margin-left: 28px;
  margin-right: 28px;
  align-self: stretch;
`;

export const ViewBar = styled.View`
  background: #CCC;
  height: 4px;
  align-self: stretch;
`;

export const ViewBarPlay = styled.View`
  height: 4px;
  width: 0;
  background: #FFF;
`;

export const TextCounter = styled.Text`
  margin-top: 12px;
  font-size: 20px;
  letter-spacing: 3px;
  color: #FFF;
`;

export const PlayButtonWrapper = styled.View`
  flex-direction: row;
  motion-path: 40px;
`;
