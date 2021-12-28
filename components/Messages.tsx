import React, { FC } from 'react';
import ChatBubble from './ChatBubble';

type MessagesTypes = {
  messages: any[],
  name: string
};

const Messages: FC<MessagesTypes> = ({ messages, name }) => (
  <div>
    {messages.map((message, i) => <div key={i}><ChatBubble message={message} name={name} /></div>)}
  </div>
);

export default Messages;