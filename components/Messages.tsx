import React, { FC } from 'react';

import ChatBubble from './ChatBubble';

type MessagesTypes = {
  messages: any[],
  name: string
};

const Messages: FC<MessagesTypes> = ({ messages, name }) => (
  <div>
    {messages.map((msg) => <div key={msg.id}><ChatBubble message={msg} name={name} /></div>)}
  </div>
);

export default Messages;
