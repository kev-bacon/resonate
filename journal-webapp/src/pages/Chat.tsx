import axios from 'axios';
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard'; // Import the Dashboard component

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, time: string, sender: 'user' | 'system' }[]>([]);
  const [newMessage, setNewMessage] = useState('');

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewMessage(e.target.value);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (newMessage.trim() !== '') {
    try {
      // Add the user's message to the state
      const userMessage = { text: newMessage, time: new Date().toLocaleTimeString(), sender: 'user' as const };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Send the user's message to the server
      const response = await axios.post('http://localhost:5001/api/chatbot', { userMessage: newMessage });
      const botResponse = response.data.response;
      const systemMessage = { text: botResponse, time: new Date().toLocaleTimeString(), sender: 'system' as const };
      setMessages((prevMessages) => [...prevMessages, systemMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
    }
    // Clear the input field after sending the message
    setNewMessage('');
  }
};


  return (
    <div className="flex flex-col pb-20 bg-white">
      {/* Include the Dashboard component here */}
      <Dashboard />
      <div className="flex flex-col mt-32 w-full max-w-[796px] mx-auto max-md:mt-10">
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col ${message.sender === 'user' ? 'self-end' : 'self-start'} mt-8`}>
            <div className={`flex flex-col justify-center text-2xl leading-6 rounded-xl ${message.sender === 'user' ? 'bg-neutral-900 text-slate-50' : 'bg-neutral-100 text-gray-800'} max-md:max-w-full`}>
              <div className="items-start px-9 pt-8 pb-20 rounded-xl max-md:px-5 max-md:max-w-full">
                {message.text}
              </div>
            </div>
            <div className="self-end mt-6 text-xs leading-4 text-right text-zinc-600">
              {message.time}
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex mt-8 w-full max-md:mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-4 border border-gray-300 rounded-l-md"
          />
          <button type="submit" className="p-4 bg-blue-500 text-white rounded-r-md">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
