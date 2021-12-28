import React, { useState } from 'react';
import styles from '../../styles/joinPage.module.css';

const JoinPage = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');

    const handleJoin = (event: any) => {

        if (!roomName?.trim().length || !username?.trim().length) {
            window.alert("Enter both fields, Both required");
            return;
        }

        if (roomName && username) {
            const updatedLocation = `/room?room=${roomName}&name=${username}`;
            window.location.href = updatedLocation;
        }
        event.preventDefault();
    }

    return (
        <div className={styles.joinContainer}>
            <h1 className={styles.welcomeText}>Welcome to ChatApp</h1>
            <div className={styles.inputContainer}>
                <input className={styles.inputBox} value={username} name="username" placeholder="Input your user name" onChange={(e) => setUsername(e.target.value)} />
                <input className={styles.inputBox} value={roomName} name="roomname" placeholder="Input your room name" onChange={(e) => setRoomName(e.target.value)} />
            </div>
            <button className={styles.joinButton} onClick={handleJoin}>Join</button>
        </div>
    );
}

export default JoinPage;