import React from 'react';

const App: React.FC = () => {
  return (
    <div className="text-center">
      <header className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-bold">Welcome to Journal Webapp</h1>
        <p className="mt-4">Start adding your journal entries!</p>
      </header>
    </div>
  );
};

export default App;
