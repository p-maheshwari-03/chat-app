import React, { FC, useContext, useEffect, useState } from "react";
import styles from "../../styles/room.module.css";
import socket from "../../socket";
import queryString from 'query-string';
import Messages from "../../components/messages";

const Room :FC = () => {
 
  const [room, setRoom] = useState<any|null>(null);
  const [name, setName]= useState<any|null>(null);
  const [users, setUsers]= useState<any|null>(null);
  const [message, setMessage]= useState<any|null>(null);
  const [messages, setMessages]= useState<Array<object>|[]>([]);

    useEffect(()=>{
      const {room, name} = queryString.parse(location.search)
      if(name && room){
        setName(name);
        setRoom(room);
      }
      
      socket.emit('join', { name, room }, (error:any) => {
        if(error) {
          alert(error);
        }
      });
    }, []);

    useEffect(() => {
      socket.on('message', message => {
        console.log('connection1');

        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        console.log('connection2');
        setUsers(users);
      });
  }, []);
  
    const sendMessage = (event:any) => {
      if(message) {
        console.log(message, " message");
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }
  
     

    return <div className={styles.roomContainer}>
        <div className={styles.userHeader}>
            <span className={styles.userName}>{name} </span><span className={styles.inChatText}>in {room}</span>
        </div>
        <hr className={styles.hr} color="#808080" />
        <div className={styles.chatMessageContainer}>
        <Messages messages={messages} name={name}/>
        </div>
        <div className={styles.messageSendContainer}>
        <input className={styles.chatInputBox} value={message} name="message" placeholder="Enter your message" onChange={(e)=>setMessage(e.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
        <button className={styles.sendButton} onClick={e => sendMessage(e)}>Send</button>
        </div>
    </div>
}

export default Room;