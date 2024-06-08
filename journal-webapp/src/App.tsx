import React, { useState } from 'react';
import './App.css';
import JournalEntryForm from './components/JournalEntryForm';
import SpiderGraph from './components/SpiderGraph';
import axios from 'axios';

const App: React.FC = () => {
  const [emotionsData, setEmotionsData] = useState([0, 0, 0, 0, 0, 0, 0]);

  const analyzeJournalEntry = async (entry: string) => {
    console.log('analyzeJournalEntry called with entry:', entry);  // Log the function call
    try {
      const response = await axios.post('http://localhost:8000/analyze', { entry });
      console.log('API response:', response.data);  // Log the API response
      const emotions = response.data.Emotions;

      setEmotionsData([
        emotions.joy,
        emotions.sadness,
        emotions.anger,
        emotions.fear,
        emotions.surprise,
        emotions.disgust,
        emotions.neutral,
      ]);
    } catch (error) {
      console.error('Error fetching analysis data:', error);
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
