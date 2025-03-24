// src/components/assistant/ChatMessage.js
import React from 'react';
import { User, MessageSquare } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? '' : 'justify-end'}`}>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
          <User size={16} />
        </div>
      )}
      
      <div className={`${isUser ? 'bg-white' : 'bg-blue-600 text-white'} p-3 rounded-lg shadow-sm max-w-3xl`}>
        <p className="whitespace-pre-line">{message.text}</p>
      </div>
      
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white ml-3 flex-shrink-0">
          <MessageSquare size={16} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;