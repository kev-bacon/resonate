// routes/generateQuote.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const Groq = require('groq-sdk');

const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

router.get('/generate-quote', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('content')
      .gte('date_time', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const entriesText = data.map(entry => entry.content).join('\n');

    const systemPrompt = {
      role: "system",
      content: "You are costar, but powered by journal entries. Provide a motivational, fun, or funny one sentence (20 characters max, don't put quotes around it) quote based on the following text:"
    };

    const messages = [
      systemPrompt,
      {
        role: "user",
        content: entriesText
      }
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 150
    });

    const quote = response.choices[0].message.content.trim();

    res.json({ quote });
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
