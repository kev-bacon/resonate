// src/components/Entry.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entry as EntryType } from '../types';
import Dashboard from './Dashboard';
import SpiderGraph from './SpiderGraph';
const Entry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<EntryType | null>(null);
  const [emotionsData, setEmotionsData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/entry/${id}`);
        setEntry(response.data);

        const analysisResponse = await axios.post('http://localhost:5001/api/analyze', { text: response.data.content });
        const analysisData = analysisResponse.data;
        setEmotionsData(analysisData.data);
      } catch (error) {
        console.error('Error fetching journal entry or analyzing it:', error);
      }
    };

    fetchEntry();
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center pb-20 bg-white">
      <Dashboard />
      <div className="mt-28 text-4xl font-medium leading-10 text-center text-neutral-700 max-md:mt-10">
        {entry.title}
      </div>
      <div className="flex flex-col flex-wrap justify-center content-center px-20 py-3 mt-14 w-full max-w-[1054px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center max-w-full w-[350px]">
          <div className="text-xs font-medium leading-5 text-right text-black uppercase tracking-[2px]">
            Tags: {entry.tags.join(', ')}
          </div>
          <div className="text-base leading-6 text-slate-400">{new Date(entry.date_time).toLocaleDateString()}</div>
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
