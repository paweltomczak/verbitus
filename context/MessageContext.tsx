import React, { createContext, useContext, useState } from 'react';

type MessageType = 'error' | 'success';

type MessageContextType = {
  message: string;
  type: MessageType;
  setMessage: (message: string, type?: MessageType) => void;
};

const MessageContext = createContext<MessageContextType>({
  message: '',
  type: 'error',
  setMessage: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<MessageType>('error');

  const setContextMessage = (message: string, type: MessageType = 'error') => {
    setMessage(message);
    setType(type);
  };

  return (
    <MessageContext.Provider
      value={{ message, type, setMessage: setContextMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
