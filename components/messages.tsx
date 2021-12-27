import React, { FC } from 'react';
import { MessagesTypes } from '../models/messages';
import ChatBubble from './chatBubble';

const Messages:FC<MessagesTypes> = ({ messages, name }) => (
  <div>
    {messages.map((message, i) => <div key={i}><ChatBubble message={message} name={name} /></div>)}
  </div>
);

export default Messages;