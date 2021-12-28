import React, { FC } from 'react';

import styles from '../styles/chatBubble.module.css';

type Message = {
  message: string,
  sender: string
};

type ChatBubbleType = {
  message: Message,
  name: string
};

const ChatBubble: FC<ChatBubbleType> = ({ message: { message, sender }, name }) => (
  <div className={styles.bubbleContainer}>
    <div className={sender === name.trim() ? styles.userChatBubble : sender === 'Bot' ? styles.botChatBubble : styles.nonUserChatBubble}>
      {message}
    </div>
    <span className={sender === name.trim() ? styles.username : styles.nonUsername}>{sender}</span>
  </div>
);

export default ChatBubble;
