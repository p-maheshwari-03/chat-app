import React from "react";
import styles from "../styles/chatBubble.module.css";
import { ChatBubbleType } from "../models/chatBubble";
import { FC } from "react";

const ChatBubble :FC<ChatBubbleType> = ( {message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
  
    if(user === trimmedName) {
      isSentByCurrentUser = true;
    }

    if (isSentByCurrentUser) {
        return <div className={styles.bubbleContainer}>
            <div className={styles.userChatBubble}>
                {text}
            </div>
            <span className={styles.username}>{user}</span>
        </div>
    } else {
        return <div className={styles.bubbleContainer}>
            <div className={styles.nonUserChatBubble}>
                {text}
            </div>
            <span className={styles.nonUsername}>{user}</span>
        </div>
    }
}

export default ChatBubble;