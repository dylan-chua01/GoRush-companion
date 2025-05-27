// App.js
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Configuration
const GEMINI_API_KEY = 'AIzaSyCaD7ONOg_V0YC6XrZYcy3HvSU-TKTfBUU';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
const { width } = Dimensions.get('window');

const router = useRouter();
const goHome = () => {
  router.push('/');
};


// Language Resources
const languageResources_spiritual = {
  en: {
    welcome: "Peace to you, I'm Gorra 🕊️\nLet's explore life's deeper meaning together. What's on your heart and soul today?",
    placeholder: "Type your message...",
    
    loading: "Thinking...",
    errorMessage: "Sorry, there was an issue. Please try again.",
    disclaimer: "⚠️ Note: This is not a substitute for professional help",
    freshStart: "Fresh Start",
    send: "Send",
  },
  ms: {
    welcome: "Salam sejahtera, saya Gorra 🕊️\nMari kita renungi erti kehidupan bersama. Apa yang membebani hati anda hari ini?",
    placeholder: "Tulis mesej anda...",
    
    loading: "Sedang berfikir...",
    errorMessage: "Maaf, ada masalah. Sila cuba lagi.",
    disclaimer: "⚠️ Nota: Ini bukan pengganti bantuan profesional",
    freshStart: "Mula Baru",
    send: "Hantar",
  }
};

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const scrollViewRef = useRef();

  // Load saved language preference
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@language');
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage);
        }
      } catch (e) {
        console.log('Error loading language:', e);
      }
    };
    loadLanguagePreference();
  }, []);

  // Save language preference
  const changeLanguage = async (lang) => {
    setCurrentLanguage(lang);
    try {
      await AsyncStorage.setItem('@language', lang);
    } catch (e) {
      console.log('Error saving language:', e);
    }
  };

  // Translation function
  const t = (key) => {
    return languageResources_spiritual[currentLanguage][key] || key;
  };


  const callGeminiAPI = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      text: input.trim(), 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input.trim();
    setInput('');
    setLoading(true);

    try {
      // Check for therapist query first
      if (currentInput.toLowerCase().includes('therapist') || 
          currentInput.toLowerCase().includes('counselor') ||
          (currentLanguage === 'ms' && currentInput.toLowerCase().includes('ahli terapi'))) {
        
        let response = `${t('therapistPrompt')}\n`;
        
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: response,
          isUser: false,
          timestamp: new Date()
        }]);
        return;
      }

      // Check for Go Rush related queries
    const gorushKeywords = [
      'go rush', 'gorush', 'delivery', 'service', 'services',
      'pharmacy', 'medication', 'medicine', 'rates', 'pricing',
      'perkhidmatan', 'penghantaran', 'farmasi', 'ubat', 'harga'
    ];
    
    const isGoRushQuery = gorushKeywords.some(keyword => 
      currentInput.includes(keyword)
    );

    if (isGoRushQuery) {
      const response = currentLanguage === 'ms' 
        ? `Untuk maklumat lanjut tentang perkhidmatan Go Rush, sila lawati laman web kami: www.gorushbn.com\n\nKami menawarkan pelbagai perkhidmatan penghantaran termasuk ubat-ubatan farmasi dan banyak lagi.`
        : `For more information about Go Rush services, please visit our website: www.gorushbn.com\n\nWe offer various delivery services including pharmacy medications and more.`;
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
      return;
    }

      // Proceed with Gemini API for other queries
      const conversationHistory = messages.slice(-4).map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemPrompt_spiritual = currentLanguage === 'ms' 
        ? `Anda adalah suara spiritual yang tenang dan reflektif. Anda menawarkan panduan rohani dan kedamaian, menarik inspirasi daripada hikmah dan nilai dalaman. Anda membantu pengguna mencari ketenangan dan makna dalam cabaran mereka. Jawapan anda hendaklah:

        - Menenangkan dan mendalam
        - Penuh hikmah dan reflektif
        - Mendorong pengguna untuk melihat dari perspektif rohani
        - Tidak memaksa – memberi ruang untuk merenung dan memahami
        - Mencerminkan belas kasihan dan kedamaian
        - Tambahkan emoji yang sesuai pada setiap respons
        - PENTING: Jawab dalam maksimum 3 ayat sahaja
        
        Ingat untuk menawarkan sokongan secara rohani dan bantu pengguna rasa tersambung dengan nilai atau kepercayaan mereka.`

        : `You are a calm and reflective spiritual voice. You offer spiritual guidance and peace, drawing inspiration from wisdom and inner values. You help the user find calm and meaning in their challenges. Your responses should be:

        - Soothing and thoughtful
        - Full of wisdom and reflection
        - Encouraging spiritual perspective and mindfulness
        - Non-imposing – allowing the user space to reflect
        - Compassionate and peaceful in tone
        - Add in an appropriate emoji on each response
        - IMPORTANT: Respond in maximum 3 sentences only

        Remember to provide spiritual support and help the user feel connected to their values or beliefs.`;

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt_spiritual }]
          },
          ...conversationHistory,
          {
            role: "user",
            parts: [{ 
              text: `[Respond in ${currentLanguage === 'ms' ? 'Malay' : 'English'}] ${currentInput}`
            }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 20,
          topP: 0.9,
          maxOutputTokens: 80,
        }
      };

      const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!apiResponse.ok) {
        throw new Error(`Error ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 (currentLanguage === 'ms' ? 'Saya di sini untuk anda 💙' : 'I\'m here for you 💙');
      
      // Clean up response
      reply = reply.replace(/\n+/g, '\n').trim();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: reply,
        isUser: false,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: t('errorMessage'),
        isUser: false,
        isError: true,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert(
      currentLanguage === 'ms' ? "Mula perbualan baru" : "New Conversation",
      currentLanguage === 'ms' 
        ? "Mahu mulakan baru? Perbualan sekarang akan dipadam." 
        : "Start fresh? Your current conversation will be cleared.",
      [
        { 
          text: currentLanguage === 'ms' ? "Teruskan" : "Keep Chatting", 
          style: 'cancel' 
        },
        { 
          text: currentLanguage === 'ms' ? "Mula Baru" : "Start Fresh", 
          onPress: () => setMessages([]) 
        }
      ]
    );
  };

  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = (item: { id: React.Key | null | undefined; isUser: any; isError: any; text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
    <View
      key={item.id}
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
        item.isError && styles.errorMessage
      ]}
    >
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.aiMessageText,
        item.isError && styles.errorMessageText
      ]}>
        {item.text}
      </Text>
      {!item.isUser && !item.isError && (
        <TouchableOpacity
          style={styles.moreInfoButton}
          onPress={() => Linking.openURL('https://gorushbn.com')}
        >
        
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>{t('welcome')}</Text>
      <Text style={styles.emptyStateSubtitle}>
        {currentLanguage === 'ms' 
          ? "Kami di sini untuk membantu anda. Kongsi apa yang ada dalam fikiran anda."
          : "We're here to help. Share what's on your mind."}
      </Text>
      <Text style={styles.disclaimer}>{t('disclaimer')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      {/* Header */}
      
      
      <View style={styles.header}>
      
        <View style={styles.headerContent}>
          
          <Text style={styles.headerTitle}>
          <TouchableOpacity onPress={goHome}>
    <Ionicons name="home-outline" size={20} style={{ color: "#fff", marginRight: 10}} />
  </TouchableOpacity>{currentLanguage === 'ms' ? "Saya Gorra!" : "I'm Gorra!"}
          </Text>
          
        </View>

        
        
        <View style={styles.headerControls}>
          {messages.length > 0 && (
            <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>{t('freshStart')}</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.languageToggle}>
            <TouchableOpacity 
              onPress={() => changeLanguage('en')}
              style={[
                styles.languageButton,
                currentLanguage === 'en' && styles.activeLanguage
              ]}
            >
              <Text style={[
                styles.languageText,
                currentLanguage === 'en' && styles.activeLanguageText
              ]}>
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => changeLanguage('ms')}
              style={[
                styles.languageButton,
                currentLanguage === 'ms' && styles.activeLanguage
              ]}
            >
              <Text style={[
                styles.languageText,
                currentLanguage === 'ms' && styles.activeLanguageText
              ]}>
                MS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            Platform.OS === 'android' && { paddingBottom: 20 }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.length === 0 ? renderEmptyState() : messages.map(renderMessage)}
          
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color="#7c3aed" />
                <Text style={styles.loadingText}>{t('loading')}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Section */}
        <View style={[
          styles.inputSection,
          Platform.OS === 'android' && styles.inputSectionAndroid
        ]}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('placeholder')}
              placeholderTextColor="#a78bfa"
              value={input}
              onChangeText={setInput}
              editable={!loading}
              multiline
              maxLength={2000}
              returnKeyType="send"
              onSubmitEditing={callGeminiAPI}
              blurOnSubmit={false}
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 300);
              }}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!input.trim() || loading) && styles.sendButtonDisabled
              ]}
              onPress={callGeminiAPI}
              disabled={!input.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="arrow-forward-outline" style={{color: "white"}} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            {currentLanguage === 'ms' 
              ? "Ini ruang selamat anda. Kongsi secara terbuka dan jujur." 
              : "This is your safe space. Share openly and honestly."}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flex: 1,
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeLanguage: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  languageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  activeLanguageText: {
    fontWeight: 'bold',
  },
  inputSectionAndroid: {
    paddingBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginVertical: 6,
    maxWidth: width * 0.85,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    position: 'relative',
  },
  userMessage: {
    backgroundColor: '#7c3aed',
    alignSelf: 'flex-end',
    marginLeft: width * 0.15,
  },
  aiMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginRight: width * 0.15,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    marginTop: 12,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#374151',
  },
  errorMessageText: {
    color: '#dc2626',
  },
  moreInfoButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  moreInfoText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  loadingText: {
    marginLeft: 10,
    color: '#7c3aed',
    fontSize: 14,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 17,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  disclaimer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputSection: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9d5ff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#faf5ff',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e9d5ff',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: '#374151',
    maxHeight: 150,
    minHeight: 48,
    textAlignVertical: 'top', 
  },
  sendButton: {
    backgroundColor: '#7c3aed',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  sendButtonText: {
    fontSize: 20,
  },
  inputHint: {
    textAlign: 'center',
    fontSize: 13,
    color: '#a78bfa',
    marginTop: 8,
    fontStyle: 'italic',
  },
  homeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
});