import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div >
    <Head>
      <title>Chat App</title>
      <meta name="description" content="Real Time Chat App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.link}>
      <Link href="/joinpage"><a>Welcome to Chat App, Click Me</a></Link>
    </div>
  </div>
);

export default Home;