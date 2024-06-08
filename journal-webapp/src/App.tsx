import axios from 'axios';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Discover from './components/Discover';
import Entry from './components/Entry';
import HomePage from './components/HomePage';
import Upload from './components/Upload';

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/entry/:id" element={<Entry />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
