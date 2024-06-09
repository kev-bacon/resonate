// src/pages/HomePage.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import RecentEntriesCarousel from '../components/RecentEntriesCarousel';
import SpiderGraph from '../components/SpiderGraph';
import { Entry } from '../types';

const HomePage: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [emotionsData, setEmotionsData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchQuoteAndAnalyze = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/generate-quote');
        const fetchedQuote = response.data.quote;
        console.log('Quote:', fetchedQuote);

        let fetchedEmotionsData: number[] = [];
        while (fetchedEmotionsData.every(emotion => emotion === 0)) {
          const analysisResponse = await axios.post('http://localhost:5001/api/analyze', { text: fetchedQuote });
          fetchedEmotionsData = analysisResponse.data.data;
          console.log('Emotions:', fetchedEmotionsData);
        }

        setQuote(fetchedQuote);
        setEmotionsData(fetchedEmotionsData);
      } catch (error) {
        console.error('Error fetching quote or analyzing it:', error);
      }
    };

    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/entries');
        const data = response.data;
        setEntries(data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchQuoteAndAnalyze();
    fetchEntries();
  }, []);

  return (
    <div className="flex flex-col pb-14 bg-white">
      <Dashboard />
      <div className="flex justify-center items-center px-16 py-20 mt-0 w-full bg-gray-100 max-md:px-5 max-md:max-w-full">
        <div className="mt-6 mb-1 w-full max-w-[1163px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto font-bold max-md:mt-10 max-md:max-w-full">
                <div className="text-7xl tracking-tighter text-neutral-800 max-md:max-w-full max-md:text-4xl max-md:leading-10">
                  {quote}
                </div>
                <Link to="/upload" className="justify-center self-start px-6 py-4 mt-6 text-xl leading-4 text-center text-gray-50 bg-neutral-900 rounded-[90px] max-md:px-5">
                  Upload entry
                </Link>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <SpiderGraph data={emotionsData} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center self-center mt-24 w-full max-w-[1272px] max-md:mt-10 max-md:max-w-full">
        <div className="text-3xl font-bold tracking-tight text-center text-black">
          Last few days in review
        </div>
        <RecentEntriesCarousel entries={entries} />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf1edcbdeac70f47457a933a9268ead76759534cac2f2308fd3c1d8174c18ff5?apiKey=285d23d46715474fb293f76359ad36c5&"
          className="mt-10 w-20 aspect-[10]"
        />
      </div>
    </div>
  );
}

export default HomePage;
