import React, { FC, useState } from 'react';

import styles from '../../styles/joinPage.module.css';

const JoinPage: FC = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomError, setRoomError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleJoin = (event: any) => {
    event.preventDefault();
    if (!username?.trim().length && !roomName?.trim().length) {
      setNameError(true);
      setRoomError(true);
    } else if (!username?.trim().length && roomName?.trim().length) {
      setNameError(true);
    } else if (!roomName?.trim().length && username?.trim().length) {
      setRoomError(true);
    }

    if (roomName && username) {
      if (!roomError && !nameError) {
        setNameError(false);
        setRoomError(false);
        const updatedLocation = `/room?room=${roomName}&name=${username}`;
        window.location.href = updatedLocation;
      }
    }
  };

  const usernameChangeHandler = (e: any) => {
    setNameError(false);
    setUsername(e.target.value);
  };

  const roomnameChangeHandler = (e: any) => {
    setRoomError(false);
    setRoomName(e.target.value);
  };

  return (
    <div className={styles.joinContainer}>
      <h1 className={styles.welcomeText}>Welcome to ChatApp</h1>
      <div className={styles.inputContainer}>
        <input className={styles.inputBox} value={username} name="userame" placeholder="User name" onChange={(e) => usernameChangeHandler(e)} />
        {nameError && <span className={styles.error}>User name required</span>}
        <input className={styles.inputBox} value={roomName} name="roomName" placeholder="Room name" onChange={(e) => roomnameChangeHandler(e)} />
        {roomError && <span className={styles.error}>Room name required</span>}
      </div>
      <button type="submit" className={styles.joinButton} onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinPage;
