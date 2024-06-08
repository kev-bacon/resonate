import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JournalEntryForm from './JournalEntryForm';
import SpiderGraph from './SpiderGraph';

const Upload: React.FC = () => {
  const [emotionsData, setEmotionsData] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const analyzeJournalEntry = async (entry: string) => {
    try {
      const response = await axios.post('http://localhost:8000/analyze', { entry });
      const data = response.data;
      setEmotionsData(data.emotions);
    } catch (error) {
      console.error('Error analyzing journal entry:', error);
    }
  };

  return (
    <div className="flex flex-col items-center pb-11 bg-white">
      <div className="flex flex-col self-stretch pt-5 w-full text-xl font-bold leading-4 text-center whitespace-nowrap bg-gray-50 text-zinc-700 max-md:max-w-full">
			  <div className="flex gap-5 justify-between items-center self-start ml-4 max-md:flex-wrap">
				  <Link to="/">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="self-stretch aspect-[2.7] w-[234px]"
					  />
					  </Link>
          <div className="shrink-0 self-stretch my-auto w-0.5 h-10 bg-gray-200 rounded-sm" />
          <Link to="/" className="self-stretch my-auto">Home</Link>
				  <Link to="/chat" className="self-stretch my-auto">Chat</Link>
          <Link to="/upload" className="self-stretch my-auto">Upload</Link>
          <Link to="/discover" className="self-stretch my-auto">Discover</Link>
        </div>
        <div className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="flex flex-col px-14 pt-16 pb-6 mt-16 w-full rounded-3xl border-0 border-black border-solid shadow-sm bg-neutral-50 max-w-[1132px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h1 className="text-4xl font-bold mb-4">Journal Analysis</h1>
        <JournalEntryForm onSubmit={analyzeJournalEntry} />
        <SpiderGraph data={emotionsData} />
      </div>
    </div>
  );
};

export default Upload;
