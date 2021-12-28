import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { FC } from 'react';

const ChatApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default ChatApp;
