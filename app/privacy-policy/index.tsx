import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <Text style={styles.headerSubtitle}>Your privacy is our priority</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Trust Banner */}
        <View style={styles.trustBanner}>
          <Text style={styles.trustIcon}>🔒</Text>
          <Text style={styles.trustTitle}>Your conversations stay with you</Text>
          <Text style={styles.trustSubtitle}>
            Everything is processed locally on your device. We don't store, 
            access, or share your personal conversations.
          </Text>
        </View>

        {/* Privacy Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡️ Data Protection</Text>
          <Text style={styles.sectionText}>
            GoRush Companion is designed with your privacy at its core. All conversations 
            and interactions happen locally on your device. We believe your personal 
            thoughts and feelings should remain private and secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Conversation Privacy</Text>
          <Text style={styles.sectionText}>
            • All chat messages are processed locally on your device{'\n'}
            • No conversations are uploaded to our servers{'\n'}
            • No third parties have access to your chats{'\n'}
            • Messages are not stored permanently{'\n'}
            • You can clear your conversation history at any time
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Local Processing</Text>
          <Text style={styles.sectionText}>
            The GoRush Companion app operates entirely on your device. When you send 
            a message, it's processed using secure AI services, but your personal 
            information never leaves your control. The app doesn't create user 
            accounts or store personal data on external servers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 What We Don't Collect</Text>
          <Text style={styles.sectionText}>
            • Personal identifying information{'\n'}
            • Conversation content or history{'\n'}
            • Location data{'\n'}
            • Contact information{'\n'}
            • Device personal files{'\n'}
            • Browsing history
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Technical Information</Text>
          <Text style={styles.sectionText}>
            The app may collect minimal technical data necessary for functionality, 
            such as error reports to improve the app experience. This technical 
            information is anonymized and doesn't include any personal conversation 
            content.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Data Sharing</Text>
          <Text style={styles.sectionText}>
            We do not share, sell, or distribute your personal information or 
            conversation data with any third parties. Your privacy is not a 
            product to be monetized.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Your Control</Text>
          <Text style={styles.sectionText}>
            • Clear your conversation history anytime{'\n'}
            • Uninstall the app to remove all local data{'\n'}
            • No account deletion needed (we don't create accounts){'\n'}
            • Complete control over your data
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚕️ Important Disclaimer</Text>
          <Text style={styles.sectionText}>
            GoRush Companion is not a replacement for professional mental health 
            services. If you're experiencing a mental health crisis, please 
            contact emergency services or a qualified mental health professional 
            immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have questions about this privacy policy or how your data is 
            handled, please contact us:{'\n\n'}
            WhatsApp: +673 233 2065{'\n'}
            Instagram: @gorush.bn{'\n'}
            Website: www.gorushbn.com
          </Text>
        </View>

        {/* Last Updated */}
        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Bottom Assurance */}
        <View style={styles.bottomAssurance}>
          <Text style={styles.assuranceIcon}>💙</Text>
          <Text style={styles.assuranceText}>
            Your trust matters to us. We're committed to keeping your 
            conversations private and secure.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  header: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e9d5ff',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  trustBanner: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7c3aed',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trustIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  trustTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 10,
    textAlign: 'center',
  },
  trustSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  lastUpdated: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  bottomAssurance: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    backgroundColor: '#e9d5ff',
    borderRadius: 20,
    alignItems: 'center',
  },
  assuranceIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  assuranceText: {
    fontSize: 16,
    color: '#7c3aed',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;