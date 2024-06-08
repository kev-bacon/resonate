import React from 'react';
import './App.css';
import JournalEntryForm from './components/JournalEntryForm';
import SpiderGraph from './components/SpiderGraph';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold">Journal Analysis</h1>
      <JournalEntryForm />
      <SpiderGraph />
    </div>
  );
};

export default App;
