// src/components/assistant/ChatInterface.js
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import apiService from '../../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setLoading(true);
        const history = await apiService.getChatHistory('user123');
        setMessages(history);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setSending(true);
    
    try {
      // Send message to backend and get response
      const response = await apiService.sendMessage('user123', inputMessage);
      
      // Add assistant response to chat
      setMessages(prevMessages => [...prevMessages, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages, 
        {
          id: Date.now(),
          sender: 'assistant',
          text: 'Sorry, I encountered an error processing your request. Please try again.'
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex-1 flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">AI Financial Assistant</h3>
        <p className="text-gray-600">Ask any question about your finances or get personalized advice</p>
      </div>
      
      <div className="flex-1 overflow-auto border rounded-lg p-4 mb-4 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            Loading conversation history...
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {sending && (
              <div className="flex justify-end">
                <div className="bg-blue-600 p-3 rounded-lg shadow-sm text-white">
                  <p>Thinking...</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white ml-3 flex-shrink-0">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex">
        <input 
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask something about your finances..."
          className="flex-1 p-3 border rounded-l-lg"
          disabled={sending}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 rounded-r-lg"
          disabled={sending}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;