import React from 'react';
import ChatBubble from './chatBubble';

type MessagesTypes = {
  messages:any[],
  name:string
};

const Messages = ({ messages, name }:MessagesTypes) => (
  <div>
    {messages.map((message, i) => <div key={i}><ChatBubble message={message} name={name} /></div>)}
  </div>
);

export default Messages;