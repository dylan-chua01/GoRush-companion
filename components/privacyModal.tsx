import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function PrivacyModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const value = await AsyncStorage.getItem('hasConsented');
      if (value !== 'true') setVisible(true);
    };
    checkConsent();
  }, []);

  const handleAccept = async () => {
    await AsyncStorage.setItem('hasConsented', 'true');
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Privacy & Consent</Text>
          <Text style={styles.text}>
            We respect your privacy. By using this app, you agree to our Terms & Privacy Policy.
          </Text>
          <Pressable onPress={handleAccept} style={styles.button}>
            <Text style={styles.buttonText}>I Understand</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
