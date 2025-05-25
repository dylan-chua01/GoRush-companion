import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const moods = [
  { label: 'Happy', icon: '😊', color: '#FFD700', gradient: ['#FFD700', '#FFA500'] },
  { label: 'Sad', icon: '😢', color: '#87CEEB', gradient: ['#87CEEB', '#4682B4'] },
  { label: 'Anxious', icon: '😰', color: '#DDA0DD', gradient: ['#DDA0DD', '#9370DB'] },
  { label: 'Angry', icon: '😠', color: '#FF6B6B', gradient: ['#FF6B6B', '#FF4757'] },
  { label: 'Calm', icon: '😌', color: '#98FB98', gradient: ['#98FB98', '#90EE90'] },
  { label: 'Excited', icon: '🤩', color: '#FF69B4', gradient: ['#FF69B4', '#FF1493'] },
  { label: 'Grateful', icon: '🙏', color: '#20B2AA', gradient: ['#20B2AA', '#008B8B'] },
  { label: 'Tired', icon: '😴', color: '#D3D3D3', gradient: ['#D3D3D3', '#A9A9A9'] },
];

interface JournalEntry {
  mood: string;
  entry: string;
  timestamp: string;
  moodColor?: string;
}

const MoodJournal = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [entry, setEntry] = useState('');
  const [saving, setSaving] = useState(false);
  const [journalHistory, setJournalHistory] = useState<{ [date: string]: JournalEntry }>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'write' | 'history'>('write');

  useEffect(() => {
    loadJournalHistory();
  }, []);

  const loadJournalHistory = async () => {
    setLoading(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter((key) => key.startsWith('journal-'));
      const entries = await AsyncStorage.multiGet(journalKeys);
      const history: { [date: string]: JournalEntry } = {};

      entries.forEach(([key, value]) => {
        if (value) {
          const date = key.replace('journal-', '');
          history[date] = JSON.parse(value);
        }
      });

      setJournalHistory(history);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setLoading(false);
    }
  };

  const saveJournal = async () => {
    if (!selectedMood || !entry.trim()) {
      Alert.alert('Missing Information', 'Please select a mood and write your thoughts.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const selectedMoodData = moods.find(m => m.label === selectedMood);
    const journalEntry: JournalEntry = {
      mood: selectedMood,
      entry: entry.trim(),
      timestamp: new Date().toISOString(),
      moodColor: selectedMoodData?.color,
    };

    setSaving(true);
    try {
      await AsyncStorage.setItem(`journal-${today}`, JSON.stringify(journalEntry));
      Alert.alert('Success! 🎉', 'Your journal entry has been saved.', [
        { text: 'OK', onPress: () => {
          setEntry('');
          setSelectedMood(null);
          loadJournalHistory();
        }}
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to save your entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (date: string) => {
    Alert.alert(
      'Delete Entry', 
      'Are you sure you want to delete this journal entry? This action cannot be undone.', 
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(`journal-${date}`);
              const updated = { ...journalHistory };
              delete updated[date];
              setJournalHistory(updated);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getMoodStats = () => {
    const entries = Object.values(journalHistory);
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as { [mood: string]: number });
    
    const totalEntries = entries.length;
    const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    
    return { totalEntries, mostCommonMood };
  };

  const stats = getMoodStats();

  const renderWriteMode = () => (
    <ScrollView style={styles.writeContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainHeader}>How are you feeling today?</Text>
        <Text style={styles.subText}>Take a moment to check in with yourself</Text>
      </View>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            style={[
              styles.moodButton,
              selectedMood === mood.label && [styles.moodButtonSelected, { borderColor: mood.color }],
            ]}
            onPress={() => setSelectedMood(mood.label)}
            activeOpacity={0.7}
          >
            <Text style={styles.moodIcon}>{mood.icon}</Text>
            <Text style={[styles.moodLabel, selectedMood === mood.label && { color: mood.color }]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <View style={styles.selectedMoodContainer}>
          <Text style={styles.selectedMoodText}>
            You're feeling {selectedMood.toLowerCase()} today {moods.find(m => m.label === selectedMood)?.icon}
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>What's on your mind?</Text>
        <TextInput
          multiline
          placeholder="Share your thoughts, experiences, or anything you'd like to remember about today..."
          value={entry}
          onChangeText={setEntry}
          style={styles.textInput}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
        <Text style={styles.charCount}>{entry.length} characters</Text>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, (!selectedMood || !entry.trim()) && styles.saveButtonDisabled]} 
        onPress={saveJournal} 
        disabled={saving || !selectedMood || !entry.trim()}
        activeOpacity={0.8}
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveText}>Save Entry ✨</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.saveButton, {backgroundColor: "#d0e8ff"}]} 
        onPress={() => router.push('/')} 
        disabled={saving || !selectedMood || !entry.trim()}
        activeOpacity={0.8}
      >
          <Text style={[styles.saveText, {color: "gray"}]}>Back to Home 🏠</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderHistoryMode = () => (
    <View style={styles.historyContainer}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Journey</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalEntries}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          {stats.mostCommonMood && (
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>
                {moods.find(m => m.label === stats.mostCommonMood[0])?.icon}
              </Text>
              <Text style={styles.statLabel}>Most Common</Text>
            </View>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your entries...</Text>
        </View>
      ) : Object.keys(journalHistory).length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📝</Text>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyText}>Start your journaling journey by writing your first entry!</Text>
        </View>
      ) : (
        <FlatList
          data={Object.entries(journalHistory).sort((a, b) => b[0].localeCompare(a[0]))}
          keyExtractor={([date]) => date}
          renderItem={({ item: [date, data] }) => (
            <View style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{formatDate(date)}</Text>
                  <Text style={styles.fullDate}>{date}</Text>
                </View>
                <View style={styles.moodIndicator}>
                  <Text style={styles.historyMoodIcon}>
                    {moods.find((m) => m.label === data.mood)?.icon}
                  </Text>
                  <Text style={styles.historyMoodLabel}>{data.mood}</Text>
                </View>
              </View>
              <Text style={styles.historyText}>{data.entry}</Text>
              <View style={styles.historyFooter}>
                <Text style={styles.timestamp}>
                  {new Date(data.timestamp).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </Text>
                <TouchableOpacity onPress={() => deleteEntry(date)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'write' && styles.activeTab]}
          onPress={() => setViewMode('write')}
        >
          <Text style={[styles.tabText, viewMode === 'write' && styles.activeTabText]}>
            ✏️ Write
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'history' && styles.activeTab]}
          onPress={() => setViewMode('history')}
        >
          <Text style={[styles.tabText, viewMode === 'history' && styles.activeTabText]}>
            📚 History
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'write' ? renderWriteMode() : renderHistoryMode()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  writeContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  mainHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: (width - 60) / 4,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E1E8ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  moodButtonSelected: {
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.15,
  },
  moodIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  selectedMoodContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMoodText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    color: '#2C3E50',
    lineHeight: 24,
  },
  charCount: {
    textAlign: 'right',
    color: '#95A5A6',
    fontSize: 12,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statEmoji: {
    fontSize: 32,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  fullDate: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 2,
  },
  moodIndicator: {
    alignItems: 'center',
  },
  historyMoodIcon: {
    fontSize: 24,
  },
  historyMoodLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  historyText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 12,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F2F6',
  },
  timestamp: {
    fontSize: 12,
    color: '#95A5A6',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
  },
  deleteText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MoodJournal;