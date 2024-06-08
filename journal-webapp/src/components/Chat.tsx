import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      text: 'How has my mood been this week?',
      time: '4:41 PM',
      sender: 'user',
    },
    {
      text: "You've had a mix of moods. Most of your entries mention feeling productive and happy, but there were a few days where you felt stressed and anxious.",
      time: '12:33 AM',
      sender: 'system',
    },
    {
      text: 'What day was I feeling the most stressed?',
      time: '4:41 PM',
      sender: 'user',
    },
    {
      text: 'You were most stressed on Tuesday, when your friend got into a car accident.',
      time: '12:33 AM',
      sender: 'system',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, time: new Date().toLocaleTimeString(), sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col pb-20 bg-white">
      <div className="flex flex-col pt-5 w-full text-xl font-bold leading-4 text-center whitespace-nowrap bg-gray-50 text-zinc-700 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-center self-start ml-4 max-md:flex-wrap">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="self-stretch aspect-[2.7] w-[234px]"
          />
          <div className="shrink-0 self-stretch my-auto w-0.5 h-10 bg-gray-200 rounded-sm" />
          <Link to="/" className="self-stretch my-auto">Home</Link>
          <Link to="/chat" className="self-stretch my-auto">Chat</Link>
          <Link to="/upload" className="self-stretch my-auto">Upload</Link>
          <Link to="/discover" className="self-stretch my-auto">Discover</Link>
        </div>
        <div className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
      </div>
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
