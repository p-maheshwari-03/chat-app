import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/room.module.css';
import socket from '../../socket';
import queryString from 'query-string';
import Messages from '../../components/Messages';

const Room: FC = () => {
  const [roomName, setRoomName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<object> | []>([]);

  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    if (name && room) {
      setUserName(name.toString());
      setRoomName(room.toString());
    }

    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('joined', (roomData) => {
      setMessages([...roomData.messages]);
    });

    socket.on('message', newMessage => {
      setMessages(messages => [...messages, newMessage]);
    });

    const messages: any = document.getElementById('messages');

    // Prior to getting your messages.
    let shouldScroll = messages?.scrollTop + messages?.clientHeight === messages?.scrollHeight;

    // After getting your messages.
    if (!shouldScroll) {
      messages.scrollTop = messages.scrollHeight;
    }
  }, []);

  const sendMessage = () => {
    if (!message?.trim()) {
      window.alert("Can't send empty message");
      return;
    }

    if (message) {
      socket.emit('sendMessage', message, userName, roomName, () => setMessage(''));
    }
  };

  return (
    <div className={styles.roomContainer}>
      <div className={styles.userHeader}>
        <span className={styles.userName}>{name} </span><span className={styles.inChatText}>in {roomName}</span>
      </div>
      <hr className={styles.hr} color="#808080" />
      <div id="messages" className={styles.chatMessageContainer}>
        <Messages messages={messages} name={userName} />
      </div>
      <div className={styles.messageSendContainer}>
        <input className={styles.chatInputBox} value={message} name="message" placeholder="Enter your message (75 chars max)" onChange={(e) => setMessage(e.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage() : null} />
        <button className={styles.sendButton} onClick={e => sendMessage()}>Send</button>
      </div>
    </div>
  );
};

export default Room;