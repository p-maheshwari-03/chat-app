import React, { FC, useState } from "react";
import { Socket } from "socket.io";
import styles from "../../styles/joinPage.module.css";
import { joinHandler } from "../../controllers/joinPage";

const JoinPage : FC = () => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");

    const handleJoin = (event:any) => {  
        const userData = {id:username, username, roomName} 
        event.preventDefault();     
        joinHandler(userData);
     
    }

    return <div className={styles.joinContainer}>
        <h1 className={styles.welcomeText}>Welcome to ChatApp</h1>
        <div className={styles.inputContainer}>
            <input className={styles.inputBox} value={username} name="username" placeholder="Input your user name" onChange={(e)=> setUsername(e.target.value)}/>
            <input className={styles.inputBox} value={roomName}  name="roomname" placeholder="Input your room name" onChange={(e)=> setRoomName(e.target.value)}/>
        </div>
        <button className={styles.joinButton} onClick={handleJoin}>Join</button>
    </div>
}

export default JoinPage;