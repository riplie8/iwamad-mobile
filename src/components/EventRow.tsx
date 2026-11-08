import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { CampusEvent } from '../data/events';

interface EventRowProps {
  event: EventItem;
  onPress: () => void;
  onLongPress: () => void;
  isSaved: boolean;
}

export default function EventRow({ event, onPress, onLongPress, isSaved }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date} • {event.place}</Text>
      {isSaved && <Text style={styles.savedText}>Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardPressed: {
    backgroundColor: '#eaeaea',
    borderColor: '#bbb',
  },
  savedText: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});