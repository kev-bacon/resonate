const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = 5001;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  credentials: true,
}));
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY must be set in the environment variables.");
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const systemPrompt = {
    role: "system",
    content: "You are a sentiment analysis API. The JSON schema should include {'sentiment_analysis': {'sentiment': 'string', 'confidence_score': 'number'}}"
  };

  const messages = [
    systemPrompt,
    {
      role: "user",
      content: `Perform sentiment analysis and provide scores between 0.1 and 1.0 for Joy, Sadness, Anger, Fear, Surprise, Disgust, and Neutral for the following text: ${text}
      
      Then create a short title for the entry, between 3 and 7 words. Make it fun and creative and reflective.
      
      Generate three key tags for the entry, separated by commas. These tags should be relevant to the content of the entry.
	  
	  Give me everything in just plain text. No symbols or quotes`
    }
  ];

  try {
    console.log('Sending request to Groq API with messages:', messages);
    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 500
    });

    console.log('Response from Groq API:', response);

    // Extract message content
    const messageContent = response.choices[0].message.content;

    // Log the content for debugging
    console.log('Message content from Groq API:', messageContent);

    // Manually extract the emotion scores, title, and tags from the response text
    const extractDetails = (text) => {
      const scores = {
        'Joy': 0,
        'Sadness': 0,
        'Anger': 0,
        'Fear': 0,
        'Surprise': 0,
        'Disgust': 0,
        'Neutral': 0
      };
      const details = {
        title: "",
        tags: []
      };

      const scoreRegex = /\*\s(\w+):\s([\d.]+)/g;
      let match;
      while ((match = scoreRegex.exec(text)) !== null) {
        if (scores.hasOwnProperty(match[1])) {
          scores[match[1]] = parseFloat(match[2]);
        }
      }

      const titleRegex = /Title:\s*(.*)/;
      const tagsRegex = /Tags:\s*(.*)/;

      const titleMatch = text.match(titleRegex);
      if (titleMatch) {
        details.title = titleMatch[1].trim();
      }

      const tagsMatch = text.match(tagsRegex);
      if (tagsMatch) {
        details.tags = tagsMatch[1].split(',').map(tag => tag.trim());
      }

      return { scores, details };
    };

    const { scores, details } = extractDetails(messageContent);
    const emotionValues = [
      scores.Joy,
      scores.Sadness,
      scores.Anger,
      scores.Fear,
      scores.Surprise,
      scores.Disgust,
      scores.Neutral,
    ];

    res.json({ data: emotionValues, title: details.title, tags: details.tags });
  } catch (error) {
    console.error('Error in request to Groq API:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});