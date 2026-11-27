import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');
  const isSendDisabled = text.trim().length === 0;

  const handleSend = () => {
    sendMessage(eventId, text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        maxLength={200}
        style={styles.input}
      />
      <Pressable
        accessibilityRole="button"
        disabled={isSendDisabled}
        onPress={handleSend}
        style={({ pressed }) => [
          styles.sendButton,
          isSendDisabled && styles.sendButtonDisabled,
          pressed && !isSendDisabled && styles.sendButtonPressed,
        ]}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text>Connecting</Text>}
      {status === 'error' && <Text>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text>No messages yet</Text>}

      {messages
        .slice()
        .reverse()
        .map((message) => (
          <Text key={message.id} style={styles.message}>
            {message.author}: {message.text}
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 20,
    gap: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonPressed: {
    backgroundColor: '#005BBB',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
});
