import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSave = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => handleToggleSave(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 100, // Clears the floating header nicely
    backgroundColor: '#fff' 
  },
  infoText: { fontSize: 14, marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
});