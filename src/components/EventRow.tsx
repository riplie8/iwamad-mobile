import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

interface EventRowProps {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved: boolean;
}

export default function EventRow({ event, onPress, onToggleSaved, isSaved }: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{isSaved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.date} • {event.place}</Text>
          {isSaved && (
            <Animated.Text entering={ZoomIn} style={styles.savedText}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
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
  action: {
    minHeight: 44,
    marginVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  savedText: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
