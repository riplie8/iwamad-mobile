import { useEffect, useState } from 'react';

import { ChatMessage, subscribeToChat } from '../lib/chat';

type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');

  useEffect(() => {
    const unsubscribe = subscribeToChat(
      eventId,
      (nextMessages) => {
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
