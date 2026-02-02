
import React from 'react';
import { Message } from '../types';
import styles from './MessageBubble.module.less';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isSent = message.type === 'sent';

  return (
    <div className={`${styles.bubbleContainer} ${isSent ? styles.sent : styles.received}`}>
      <span className={styles.timestamp}>
        {!isSent && `${message.speakerName} · `}
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <div className={`${styles.bubble} ${isSent ? styles.sent : styles.received}`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
