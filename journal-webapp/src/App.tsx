import React, { useState } from 'react';
import './App.css';
import JournalEntryForm from './components/JournalEntryForm';
import SpiderGraph from './components/SpiderGraph';
import axios from 'axios';

const App: React.FC = () => {
  const [emotionsData, setEmotionsData] = useState([0, 0, 0, 0, 0, 0]);

  const analyzeJournalEntry = async (entry: string) => {
    try {
      const response = await axios.post('http://localhost:8000/analyze', { entry });
      const { data } = response; // TO DO: Retrieve info from backend in JSON format
      setEmotionsData(data.emotions);
    } catch (error) {
      console.error('Error analyzing journal entry:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold">Journal Analysis</h1>
      <JournalEntryForm onSubmit={analyzeJournalEntry} />
      <SpiderGraph data={emotionsData} />
    </div>
  );
};

export default App;
