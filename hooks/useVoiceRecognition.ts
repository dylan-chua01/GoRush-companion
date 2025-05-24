import Voice from '@react-native-voice/voice';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export const useVoiceRecognition = (onResult: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (e) => {
      const speech = e.value[0];
      onResult(speech);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    try {
      await Voice.start('en-US');
    } catch (err) {
      console.error('Voice start error', err);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      console.error('Voice stop error', err);
    }
  };

  return { isRecording, startListening, stopListening };
};