import React, { useState } from 'react';

interface JournalEntryFormProps {
  onSubmit: (entry: string) => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSubmit }) => {
  const [journalEntry, setJournalEntry] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalEntry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with entry:', journalEntry);  // Log the journal entry
    onSubmit(journalEntry);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <textarea
        value={journalEntry}
        onChange={handleInputChange}
        placeholder="Write your journal entry here..."
        className="w-full p-2 border border-gray-300 rounded"
        rows={10}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default JournalEntryForm;
