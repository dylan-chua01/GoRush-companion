import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const modes = [
  {
    id: "empathy",
    name: "Empathetic Listener",
    emoji: "🌈",
    description: "Validation and emotional support",
    color: "#a3d8f4",
    type: "empathetic",
  },
  {
    id: "motivational",
    name: "Motivational Coach",
    emoji: "🎓",
    description: "Encouragement and confidence-building",
    color: "#f3d250",
    type: "motivational",
  },
  {
    id: "spiritual",
    name: "Spiritual Guide",
    emoji: "🕯️",
    description: "Wisdom and inner peace",
    color: "#d4a5a5",
    type: "spiritual",
  },
  {
    id: "practical",
    name: "Practical Advisor",
    emoji: "📝",
    description: "Solution-focused guidance",
    color: "#9fd8cb",
    type: "practical",
  },
  {
    id: "humorous",
    name: "Humorous Friend",
    emoji: "🤡",
    description: "Lighthearted mood-lifting",
    color: "#ffb6b9",
    type: "humorous",
  },
  {
    id: "casual",
    name: "Casual Chat Buddy",
    emoji: "💬",
    description: "Casual, friendly conversation",
    color: "#a0e7e5",
    type: "casual",
  }
];

const MoodSelector = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("gorra_persona").then((mode) => {
      if (mode) setSelectedMode(mode);
    });
  }, []);

  const handleSelect = async (modeId: string) => {
    setSelectedMode(modeId);
    await AsyncStorage.setItem("gorra_persona", modeId);
    
    // Navigate to different screens based on the selected mode
    switch(modeId) {
        case 'empathy': // Changed from 'calm' to 'empathy'
          router.push('/empathy'); 
          break;
        case 'motivational':
          router.push('/motivational'); 
          break;
        case 'spiritual':
          router.push('/spiritual');
          break;
        case 'humorous':
          router.push('/humorous');
          break;
        case 'practical':
        router.push('/practical');
        break;
        case 'casual':
        router.push('/casual');
        break;
        default:
          router.push('/')
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who do you need most now?</Text>
      <FlatList
        data={modes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item.id)}
            style={[styles.card, { backgroundColor: item.color, borderWidth: selectedMode === item.id ? 2 : 0 }]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MoodSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  emoji: {
    fontSize: 32,
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    color: "#333",
  },
});
