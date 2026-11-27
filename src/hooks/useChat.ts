import { useEffect, useRef, useState } from 'react';

import { ChatMessage, DEVICE_ID, subscribeToChat } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    seenIds.current = null;

    const unsubscribe = subscribeToChat(
      eventId,
      (nextMessages) => {
        if (seenIds.current === null) {
          // The initial snapshot is history, so remember it without notifying.
          seenIds.current = new Set(nextMessages.map((message) => message.id));
        } else {
          for (const message of nextMessages) {
            if (!seenIds.current.has(message.id)) {
              seenIds.current.add(message.id);

              if (message.deviceId !== DEVICE_ID) {
                void notifyNewMessage(eventTitle, message);
              }
            }
          }
        }

        setMessages(nextMessages);
        setStatus('live');
      },
      () => {
        setStatus('error');
      },
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
