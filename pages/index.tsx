import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import JoinPage from './joinpage';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Chat App</title>
      <meta name="description" content="Real Time Chat App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <JoinPage />
  </div>
);

export default Home;
