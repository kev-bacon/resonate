import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TranscribeTextProps {
  imageUrl: string;
}

const TranscribeText: React.FC<TranscribeTextProps> = ({ imageUrl }) => {
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl) {
      transcribeImage();
    }
  }, [imageUrl]);

  const transcribeImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/run-prompt',
        { imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setTranscribedText(response.data.outputs.text);
    } catch (err) {
      console.error('Error transcribing image:', err);
      setError('Failed to transcribe image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Transcribing...</p>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {transcribedText && (
            <div>
              <h3>Transcribed Text:</h3>
              <p>{transcribedText}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TranscribeText;
