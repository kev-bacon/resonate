// routes/chatbot.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const Groq = require('groq-sdk');
require('dotenv').config();

const router = express.Router();

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In-memory store for conversation history
let conversationHistory = [];

router.post('/chatbot', async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required' });
  }

  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('content');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const entriesText = data.map(entry => entry.content).join('\n');
    conversationHistory.push({ role: 'user', content: userMessage });

    const messages = [
      { role: "system", content: "You are a helpful assistant with access to past journal entries. Talk to the user, keep your responses positive and helpful and not too long (1-2 sentences max) or dramatic." },
      ...conversationHistory,
      { role: "user", content: entriesText }
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 150,
    });

    const botResponse = response.choices[0].message.content.trim();
    conversationHistory.push({ role: 'assistant', content: botResponse });

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error in chatbot conversation:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
