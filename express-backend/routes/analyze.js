// routes/analyze.js
const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

router.post('/analyze', async (req, res) => {
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
      
      Give me everything in just plain text. No symbols`
    }
  ];

  try {
    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 500
    });

    const messageContent = response.choices[0].message.content;

    const extractDetails = (text) => {
      const scores = {
        'Joy': 0.1,
        'Sadness': 0,
        'Anger': 0,
        'Fear': 0,
        'Surprise': 0.2,
        'Disgust': 0,
        'Neutral': 0.2
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

module.exports = router;
