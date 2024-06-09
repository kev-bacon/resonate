import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SpiderGraph from './SpiderGraph';

const Entry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [emotionsData, setEmotionsData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // Replace the mock data fetching with real data fetching
  const entry = {
    id,
    title: 'AI Generated Title',
    date: 'June 7, 2024',
    tags: ['Happy', 'travel'],
    content: `
      Today has been a day of introspection and quiet reflection. I started
      my morning with a brisk walk in the nearby park. The air was crisp,
      and the sky was painted with hues of pink and orange as the sun began
      to rise. 
    `,
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post('http://localhost:5001/analyze', { text: entry.content });
        const data = response.data;
        setEmotionsData(data.data);
      } catch (error) {
        console.error('Error analyzing journal entry:', error);
      }
    };

    fetchAnalysis();
  }, [entry.content]);

  return (
    <div className="flex flex-col items-center pb-20 bg-white">
      <div className="flex flex-col self-stretch pt-5 w-full text-xl font-bold leading-4 text-center whitespace-nowrap bg-gray-50 text-zinc-700 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-center self-start ml-4 max-md:flex-wrap">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="self-stretch aspect-[2.7] w-[234px]"
          />
          <div className="shrink-0 self-stretch my-auto w-0.5 h-10 bg-gray-200 rounded-sm" />
          <Link to="/" className="self-stretch my-auto">Home</Link>
          <div className="self-stretch my-auto">Chat</div>
          <Link to="/upload" className="self-stretch my-auto">Upload</Link>
          <Link to="/discover" className="self-stretch my-auto">Discover</Link>
        </div>
        <div className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-28 text-4xl font-medium leading-10 text-center text-neutral-700 max-md:mt-10">
        {entry.title}
      </div>
      <div className="flex flex-col flex-wrap justify-center content-center px-20 py-3 mt-14 w-full max-w-[1054px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center max-w-full w-[350px]">
          <div className="text-xs font-medium leading-5 text-right text-black uppercase tracking-[2px]">
            Tags: {entry.tags.join(', ')}
          </div>
          <div className="text-base leading-6 text-slate-400">{entry.date}</div>
        </div>
        <div className="mt-12 text-base leading-6 text-neutral-700 max-md:mt-10 max-md:mr-0.5 max-md:max-w-full">
          {entry.content}
        </div>
        <SpiderGraph data={emotionsData} />
      </div>
    </div>
  );
};

export default Entry;
