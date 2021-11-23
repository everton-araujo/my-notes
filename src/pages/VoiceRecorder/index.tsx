import React, { Component } from "react";
import { Dimensions, PermissionsAndroid, Platform } from "react-native";
import AudioRecorderPlayer, { 
  AudioEncoderAndroidType, 
  AudioSet, 
  AudioSourceAndroidType, 
  AVEncoderAudioQualityIOSType, 
  AVEncodingOption, 
  PlayBackType, 
  RecordBackType
} from "react-native-audio-recorder-player";

import {
  Button,
  ButtonText,
  Container,
  PlayButtonWrapper,
  RecordButtonWrapper,
  TextCounter,
  TextRecordCounter,
  TitleText,
  ViewBar,
  ViewBarPlay,
  ViewBarWrapper,
  ViewPlayer,
  ViewRecorder
} from "./styles";

interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

const screenWidth = Dimensions.get('screen').width;

class VoiceRecorder extends Component<any, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  public render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <Container>
        <TitleText>
          Audio Recorder Player
        </TitleText>

        <TextRecordCounter>
          {this.state.recordTime}
        </TextRecordCounter>

        <ViewRecorder>
          <RecordButtonWrapper>
            <Button onPress={this.onStartRecord}>
              <ButtonText>Record</ButtonText>
            </Button>

            <Button onPress={this.onPauseRecord}>
              <ButtonText>Pause</ButtonText>
            </Button>

            <Button onPress={this.onResumeRecord}>
              <ButtonText>Resume</ButtonText>
            </Button>

            <Button onPress={this.onStopRecord}>
              <ButtonText>Stop</ButtonText>
            </Button>
          </RecordButtonWrapper>
        </ViewRecorder>

        <ViewPlayer>
          <ViewBarWrapper onPress={this.onStatusPress}>
            <ViewBar>
              <ViewBarPlay style={{ width: playWidth }} />
            </ViewBar>
          </ViewBarWrapper>

          <TextCounter>
            {this.state.playTime} / {this.state.duration}
          </TextCounter>

          <PlayButtonWrapper>
            <Button onPress={this.onStartPlay}>
              <ButtonText>Play</ButtonText>
            </Button>

            <Button onPress={this.onPausePlay}>
              <ButtonText>Pause</ButtonText>
            </Button>

            <Button onPress={this.onResumePlay}>
              <ButtonText>Resume</ButtonText>
            </Button>

            <Button onPress={this.onStopPlay}>
              <ButtonText>Stop</ButtonText>
            </Button>
          </PlayButtonWrapper>
        </ViewPlayer>
      </Container>
    );
  }

  private onStatusPress = (event: any) => {
    const touchX = event.nativeEvent.locationX;
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
    }
  };

  private onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    // console.log('audioSet', audioSet);

    const uri = await this.audioRecorderPlayer.startRecorder(
      // 'file:///sdcard/media/audio/sound.mp4',
      // 'file:////data/user/0/com.voicerecorder/cache/sound.mp4',
      undefined,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener((event: RecordBackType) => {
      // console.log('record-back', event);

      this.setState({
        recordSecs: event.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(event.currentPosition)
        )
      });
    });
    console.log(`uri: ${uri}`);
  }

  private onPauseRecord = async() => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      // console.error('pauseRecord', err);
    }
  }

  private onResumeRecord = async() => {
    await this.audioRecorderPlayer.resumeRecorder();
  }

  private onStopRecord = async() => {
    const result = await this.audioRecorderPlayer.stopRecorder();

    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0
    });
  }

  private onStartPlay = async() => {
    const msg = await this.audioRecorderPlayer.startPlayer();
    const volume = await this.audioRecorderPlayer.setVolume(1.0);

    this.audioRecorderPlayer.addPlayBackListener((event: PlayBackType) => {
      this.setState({
        currentPositionSec: event.currentPosition,
        currentDurationSec: event.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(event.currentPosition)
        ),
        duration: this.audioRecorderPlayer.mmssss(
          Math.fround(event.duration)
        )
      });
    });
  }

  private onPausePlay = async() => {
    await this.audioRecorderPlayer.pausePlayer();
  }

  private onResumePlay = async() => {
    await this.audioRecorderPlayer.resumePlayer();
  }

  private onStopPlay = async() => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  }
}

export default VoiceRecorder;
