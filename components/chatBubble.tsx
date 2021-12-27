import React from "react";
import styles from "../styles/chatBubble.module.css";
import { ChatBubbleType } from "../models/chatBubble";
import { FC } from "react";

const ChatBubble :FC<ChatBubbleType> = ( {message: { message, sender }, name }) => {
    return (
        <div className={styles.bubbleContainer}>
            <div className={sender === name.trim() ? styles.userChatBubble : styles.nonUserChatBubble}>
                {message}
            </div>
            <span className={sender === name.trim() ? styles.username : styles.nonUsername}>{sender}</span>
        </div>
    )
}

export default ChatBubble;