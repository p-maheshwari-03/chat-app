import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import JoinPage from './joinpage';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Chat App</title>
      <meta name="description" content="Real Time Chat App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.link}>
      <JoinPage />
    </div>
  </div>
);

export default Home;