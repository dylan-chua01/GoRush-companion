import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
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

const GEMINI_API_KEY = 'AIzaSyCaD7ONOg_V0YC6XrZYcy3HvSU-TKTfBUU'; // Replace with your actual key
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const { width, height } = Dimensions.get('window');

// Supportive conversation starter
const SUPPORTIVE_SYSTEM_PROMPT = `You are a caring, empathetic friend who provides emotional support. You listen without judgment, offer comfort, and respond with warmth and understanding. You're like a close friend or family member - someone who truly cares. Your responses should be:

- Warm, genuine, and empathetic
- Non-judgmental and supportive
- Personal and conversational (not clinical or robotic)
- Focused on emotional support and understanding
- Encouraging but not dismissive of feelings
- Like talking to a trusted friend or family member

Remember to validate feelings, offer comfort, and be genuinely caring in your responses.`;

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const callGeminiAPI = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input.trim(), isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input.trim();
    setInput('');
    setLoading(true);

    try {
      // Create conversation context with supportive prompt
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: SUPPORTIVE_SYSTEM_PROMPT }]
          },
          ...conversationHistory,
          {
            role: 'user',
            parts: [{ text: currentInput }]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
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
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Error ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I\'m here for you, but I\'m having trouble responding right now. Please try again.';
      
      const aiMessage = { id: Date.now() + 1, text: reply, isUser: false, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: `I'm sorry, I'm having trouble connecting right now. But I want you to know that I'm here for you. Please try again in a moment. 💙`, 
        isUser: false, 
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert(
      'New Conversation',
      'Start fresh? Your current conversation will be cleared.',
      [
        { text: 'Keep Chatting', style: 'cancel' },
        { text: 'Start Fresh', onPress: () => setMessages([]) }
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

  const renderMessage = (item) => (
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
      {!item.isUser && (
        <View style={styles.aiLabel}>
          <Text style={styles.aiLabelText}>💙 Friend</Text>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>💙</Text>
      <Text style={styles.emptyStateTitle}>I'm here for you</Text>
      <Text style={styles.emptyStateSubtitle}>
        Whatever you're going through, you don't have to face it alone. 
        I'm here to listen, support, and be your friend.
      </Text>
      <View style={styles.suggestionContainer}>
        <TouchableOpacity 
          style={styles.suggestionChip}
          onPress={() => setInput("I'm feeling really down today...")}
        >
          <Text style={styles.suggestionText}>💭 Share your feelings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.suggestionChip}
          onPress={() => setInput("I need someone to talk to")}
        >
          <Text style={styles.suggestionText}>🤗 Need to talk</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.suggestionChip}
          onPress={() => setInput("I'm going through a tough time")}
        >
          <Text style={styles.suggestionText}>💪 Tough times</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.suggestionChip}
          onPress={() => setInput("Tell me something encouraging")}
        >
          <Text style={styles.suggestionText}>✨ Need encouragement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Safe Space 💙</Text>
          <Text style={styles.headerSubtitle}>A caring friend who's always here</Text>
        </View>
        {messages.length > 0 && (
          <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Fresh Start</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? renderEmptyState() : messages.map(renderMessage)}
          
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color="#7c3aed" />
                <Text style={styles.loadingText}>Listening with care...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Share what's on your heart..."
              placeholderTextColor="#a78bfa"
              value={input}
              onChangeText={setInput}
              editable={!loading}
              multiline
              maxLength={2000}
              returnKeyType="send"
              onSubmitEditing={callGeminiAPI}
              blurOnSubmit={false}
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
                <Text style={styles.sendButtonText}>💙</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            This is your safe space. Share openly and honestly. 🤗
          </Text>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
}

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
  aiLabel: {
    position: 'absolute',
    top: -10,
    left: 16,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  aiLabelText: {
    fontSize: 11,
    color: '#7c3aed',
    fontWeight: '600',
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
  emptyStateIcon: {
    fontSize: 72,
    marginBottom: 20,
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
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  suggestionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  suggestionChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    minWidth: '80%',
    alignItems: 'center',
  },
  suggestionText: {
    color: '#7c3aed',
    fontSize: 15,
    fontWeight: '500',
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
});