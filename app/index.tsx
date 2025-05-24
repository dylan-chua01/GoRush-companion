import * as Network from 'expo-network';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const GEMINI_API_KEY = 'AIzaSyCaD7ONOg_V0YC6XrZYcy3HvSU-TKTfBUU'; // Replace in production
const MODEL = 'gemini-2.0-flash';
const PROXY_URL = 'https://your-proxy-server.com/proxy';
const DIRECT_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('Checking...');
  const [connectionMethod, setConnectionMethod] = useState<'proxy' | 'direct'>('proxy');

  const API_URL = connectionMethod === 'proxy' ? PROXY_URL : DIRECT_URL;

  useEffect(() => {
    checkNetwork();
  }, [connectionMethod]);

  const checkNetwork = async () => {
    try {
      const { isInternetReachable, isConnected } = await Network.getNetworkStateAsync();
      if (!isConnected || !isInternetReachable) {
        setNetworkStatus('Offline');
        throw new Error('No network connection');
      }

      const ping = await fetch('https://www.google.com', { method: 'HEAD', cache: 'no-store' });
      if (!ping.ok) throw new Error('Internet blocked');

      const test = await fetch(API_URL, { method: 'OPTIONS' });
      if (!test.ok) throw new Error(`${connectionMethod} connection blocked`);

      setNetworkStatus('Online');
    } catch (err: any) {
      console.warn(err.message);
      setNetworkStatus(`Error: ${err.message}`);
      showNetworkAlert(err.message);
    }
  };

  const showNetworkAlert = (message: string) => {
    Alert.alert(
      'Network Issue',
      `${message}\nAttempted using ${connectionMethod} mode.`,
      [
        {
          text: 'Switch Connection',
          onPress: () => setConnectionMethod(prev => (prev === 'proxy' ? 'direct' : 'proxy'))
        },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'OK' }
      ]
    );
  };

  const callGeminiAPI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const payload = {
        contents: [{ role: 'user', parts: [{ text: input }] }]
      };

      const body = connectionMethod === 'proxy'
        ? JSON.stringify({ targetUrl: DIRECT_URL, payload })
        : JSON.stringify(payload);

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body,
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const result = connectionMethod === 'proxy' ? data.proxyResponse : data;
      const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply.';

      setResponse(reply);
    } catch (err: any) {
      handleAPIError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAPIError = (error: any) => {
    console.error('API Error:', error);
    let message = error.message;

    if (message.includes('Network request failed')) {
      message = `Network error (${connectionMethod}). Switching...`;
      setConnectionMethod(prev => (prev === 'proxy' ? 'direct' : 'proxy'));
    } else if (message.includes('Abort')) {
      message = 'Request timed out (30s)';
    }

    Alert.alert('API Error', message);
    setResponse(`Error: ${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Network: {networkStatus} | Mode: {connectionMethod.toUpperCase()}
        </Text>
      </View>

      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>
          {loading ? 'Loading...' : response || 'Enter a message and tap Send'}
        </Text>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Switch Mode"
            onPress={() => setConnectionMethod(prev => (prev === 'proxy' ? 'direct' : 'proxy'))}
            color="#666"
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              title="Send"
              onPress={callGeminiAPI}
              disabled={!input.trim()}
              color="#6200ee"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: '#f5f5f5'
  },
  statusBar: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 12,
    color: '#333'
  },
  responseContainer: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 60,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  }
});
