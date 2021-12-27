import React, { createContext, FC, useEffect, useState } from "react";
import styles from "../../styles/joinPage.module.css";
import { JoinPageProps } from "../../models/joinPage";

const JoinPageContext = createContext({})

const JoinPage : FC <JoinPageProps>= ({dataFetcher}) => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [joined, setJoined] = useState(false);

    const handleJoin = (event:any) => {  
        if(roomName && username){        
        const updatedLocation = `/room?room=${roomName}&name=${username}`;
        window.location.href=updatedLocation;
        //History.push
        setJoined(true);
        } 
        event.preventDefault(); 
    }

    return <JoinPageContext.Provider value={{username, roomName}} >
    <div className={styles.joinContainer}>
        <h1 className={styles.welcomeText}>Welcome to ChatApp</h1>
        <div className={styles.inputContainer}>
            <input className={styles.inputBox} value={username} name="username" placeholder="Input your user name" onChange={(e)=> setUsername(e.target.value)}/>
            <input className={styles.inputBox} value={roomName}  name="roomname" placeholder="Input your room name" onChange={(e)=> setRoomName(e.target.value)}/>
        </div>
        <button className={styles.joinButton} onClick={handleJoin}>Join</button>
    </div>
    </JoinPageContext.Provider> 
}

export default JoinPage;