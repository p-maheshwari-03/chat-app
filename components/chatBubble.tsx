import React from "react";
import styles from "../styles/chatBubble.module.css";

type ChatBubbleType = {
    message: Message,
    name: string
}

type Message = {
    message:string,
    sender:string
}


const ChatBubble = ( {message: { message, sender }, name }:ChatBubbleType) => {
    return (
        <div className={styles.bubbleContainer}>
            <div className={sender === name.trim() ? styles.userChatBubble : sender == "Bot" ? styles.botChatBubble :styles.nonUserChatBubble}>
                {message}
            </div>
            <span className={sender === name.trim() ? styles.username : styles.nonUsername}>{sender}</span>
        </div>
    )
}

export default ChatBubble;