import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const { savedIds, toggleSaved } = useSavedIds();

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Could not load events</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <Pressable style={styles.retryButton} accessibilityRole="button" onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filteredEvents = data.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
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
  errorText: { color: 'red', marginBottom: 12 },
  retryButton: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
});
