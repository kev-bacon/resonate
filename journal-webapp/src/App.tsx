import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Upload from './components/Upload';
import Discover from './components/Discover';
import Entry from './components/Entry';
import Chat from './components/Chat';

const App: React.FC = () => {
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
