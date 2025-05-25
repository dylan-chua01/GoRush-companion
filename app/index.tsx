import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openWebsite = () => {
    Linking.openURL('https://www.gorushbn.com/');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/gorush.bn/?hl=en');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/6732332065');
  };

  const callPolice = () => {
    Linking.openURL('tel:993');
  };

  const callAmbulance = () => {
    Linking.openURL('tel:991');
  };

  const callMentalHealthHotline = () => {
    Linking.openURL('tel:145');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appName}>GoRush Companion</Text>
            <Text style={styles.tagline}>Your caring digital friend 💙</Text>
          </View>
        </View>

        

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/GoRush_Logo.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>A Safe Space for You</Text>
          <Text style={styles.descriptionText}>
            Sometimes we all need someone to talk to. Whether you're feeling down, 
            need encouragement, or just want to share what's on your mind, 
            I'm here to listen without judgment.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤗</Text>
            <Text style={styles.featureText}>Supportive & caring</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Private & safe</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⏰</Text>
            <Text style={styles.featureText}>Available 24/7</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/mood')}
          >
            <Text style={styles.primaryButtonText}>💙 Start Chatting</Text>
            <Text style={[styles.buttonSubtext, {color: "white"}]}>Begin your conversation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={openWebsite}
          >
            <Text style={styles.secondaryButtonText}>🌟 Our Services</Text>
            <Text style={styles.buttonSubtext}>Learn more about GoRush</Text>
          </TouchableOpacity>
          <TouchableOpacity 
  style={styles.journalButton} 
  onPress={() => router.push('/journal')}
>
  <Text style={styles.journalButtonText}>📔 Your Journal</Text>
  <Text style={styles.journalButtonSubtext}>Reflect on your thoughts</Text>
</TouchableOpacity>
        </View>
{/* Emergency Services */}
<View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>🚨 Emergency Contacts</Text>
          <View style={styles.hotlineContainer}>
            <TouchableOpacity style={styles.emergencyButton} onPress={callPolice}>
              <Text style={styles.emergencyIcon}>🚔</Text>
              <View style={styles.emergencyTextContainer}>
                <Text style={styles.emergencyLabel}>Police Emergency</Text>
                <Text style={styles.emergencyNumber}>993</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyButton} onPress={callAmbulance}>
              <Text style={styles.emergencyIcon}>🚑</Text>
              <View style={styles.emergencyTextContainer}>
                <Text style={styles.emergencyLabel}>Ambulance Emergency</Text>
                <Text style={styles.emergencyNumber}>991</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyButton} onPress={callMentalHealthHotline}>
              <Text style={styles.emergencyIcon}>💚</Text>
              <View style={styles.emergencyTextContainer}>
                <Text style={styles.emergencyLabel}>Mental Health Hotline</Text>
                <Text style={styles.emergencyNumber}>145</Text>
              </View>
              
            </TouchableOpacity>
          </View>
          <Text style={styles.emergencyNote}>
            Tap to call directly. Available 24/7 in Brunei.
          </Text>
        </View>
        {/* Disclaimer */}
        <View style={styles.disclaimerSection}>
        <TouchableOpacity 
             
             onPress={() => router.push('/privacy-policy')}
           >
           <Text style={[styles.disclaimer, {marginBottom: 25, fontWeight: "800", color: "red", fontSize: 18}]}>
             Our Privacy Policy
           </Text>
           </TouchableOpacity>
          <Text style={styles.disclaimer}>
            ⚠️ This companion is not a licensed therapist. If you're in crisis, 
            please contact a mental health professional or emergency services.
          </Text>
        </View>

        

        {/* Footer with Socials */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Connect with GoRush</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={openInstagram}>
              <Text style={styles.socialIcon}>📸</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={openWhatsApp}>
              <Text style={styles.socialIcon}>💬</Text>
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>© 2025 GoRush - Always here for you</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerSection: {
    backgroundColor: '#7c3aed',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#e9d5ff',
    marginBottom: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#e9d5ff',
    textAlign: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 30,
  },
  logoContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: width * 0.6,
    height: 80,
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c3aed',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7c3aed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#7c3aed',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  buttonSubtext: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  disclaimerSection: {
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  disclaimer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footerSection: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9d5ff',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9d5ff',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  socialText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  emergencySection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 30,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 15,
  },
  hotlineContainer: {
    marginBottom: 10,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  emergencyIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 2,
  },
  emergencyNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  emergencyNote: {
    fontSize: 12,
    color: '#dc2626',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  journalButton: {
    backgroundColor: '#f5f3ff',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  journalButtonText: {
    color: '#7c3aed',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  journalButtonSubtext: {
    fontSize: 14,
    color: '#a78bfa',
    opacity: 0.8,
    marginTop: 2,
  },
});

export default HomeScreen;