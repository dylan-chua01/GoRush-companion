import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function TermsScreen({ onAcknowledge }: { onAcknowledge: () => void }) {
  const openEmergencyContacts = () => {
    Linking.openURL('https://www.moh.gov.bn/Pages/Contact-Us.aspx');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialIcons name="privacy-tip" size={28} color="#7c3aed" />
          <Text style={styles.title}>Terms & Privacy</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Purpose of the App</Text>
          <Text style={styles.text}>
            GoRush Companion is designed to support your emotional well-being through:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Daily check-ins and mood tracking</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Supportive AI conversations</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Helpful mental health resources</Text>
          </View>
          <Text style={styles.note}>
            ⚠️ Not a replacement for professional mental healthcare
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Your Privacy</Text>
          <Text style={styles.subtitle}>We value your trust. Here's how we handle data:</Text>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="lock" size={16} color="#7c3aed" style={styles.icon} />
            <Text style={styles.text}>Journal entries stay private on your device</Text>
          </View>
          <View style={styles.bulletPoint}>
            <MaterialIcons name="visibility-off" size={16} color="#7c3aed" style={styles.icon} />
            <Text style={styles.text}>No personal identifiers collected</Text>
          </View>
          <View style={styles.bulletPoint}>
            <MaterialIcons name="share" size={16} color="#7c3aed" style={styles.icon} />
            <Text style={styles.text}>You control what you share</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Support Resources</Text>
          <Text style={styles.text}>
            In crisis situations, please contact:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={openEmergencyContacts}
          >
            <Text style={styles.emergencyText}>Brunei Emergency Contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.consentCard}>
          <Text style={styles.consentTitle}>Your Consent</Text>
          <Text style={styles.consentText}>
            By using this app, you confirm that:
          </Text>
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={16} color="#7c3aed" style={styles.icon} />
            <Text style={styles.consentText}>You're over 13 years old</Text>
          </View>
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={16} color="#7c3aed" style={styles.icon} />
            <Text style={styles.consentText}>You understand this is for general support only</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          We're honored to be part of your wellness journey. 💜
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I Understand & Agree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#7c3aed',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  consentCard: {
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 10,
  },
  consentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5b21b6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 5,
  },
  consentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
  },
  note: {
    fontSize: 13,
    color: '#dc2626',
    marginTop: 10,
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    marginRight: 8,
    color: '#7c3aed',
  },
  icon: {
    marginRight: 8,
    marginTop: 3,
  },
  emergencyButton: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  emergencyText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  footer: {
    fontSize: 14,
    color: '#7c3aed',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#e9d5ff',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});