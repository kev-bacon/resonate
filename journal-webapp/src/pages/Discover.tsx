import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import supabaseClient from '../utils/supabaseClient';

const Discover: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabaseClient
        .from('journal_entries')
        .select('*')
        .order('date_time', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
      } else {
        setEntries(data);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="flex flex-col items-center pb-20 bg-white">
      <Dashboard />
      <div className="mt-28 text-4xl font-medium leading-10 text-center text-neutral-700 max-md:mt-10">
        All Entries
      </div>
      {entries.map((entry) => (
        <Link
          key={entry.id}
          to={`/entry/${entry.id}`}
          className="flex flex-col justify-start content-start px-20 py-3 mt-14 w-full max-w-[1054px] max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          <div className="flex flex-col font-medium max-md:flex-wrap max-md:max-w-full">
            <div className="text-2xl leading-7 text-neutral-700 max-md:max-w-full">
              {entry.title}
            </div>
            <div className="text-xs leading-5 text-black uppercase tracking-[2px] mt-2">
              Tags: {entry.tags.join(', ')}
            </div>
            <div className="text-base leading-6 text-slate-400 mt-2">
              {new Date(entry.date_time).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-4 text-base leading-6 text-neutral-700 max-md:mt-10 max-md:max-w-full">
            {entry.content.slice(0, 150)}...
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Discover;
