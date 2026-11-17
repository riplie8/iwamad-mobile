import React from 'react';
import { ActivityIndicator, Pressable, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

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
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable style={styles.retryButton} accessibilityRole="button" onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text>No event with id {id}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>Date: {event.date}</Text>
      <Text style={styles.text}>Place: {event.place}</Text>
      <Text style={styles.text}>Available Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: 'red', marginBottom: 8 },
  retryButton: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, marginBottom: 6 },
});
