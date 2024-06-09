// routes/generateQuote.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const Groq = require('groq-sdk');

const router = express.Router();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

router.post('/generate-quote', async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: entries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .gte('date_time', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching entries:', error);
    return res.status(500).json({ error: error.message });
  }

  if (entries.length === 0) {
    return res.status(404).json({ message: 'No entries found for the past 7 days' });
  }

  const journalText = entries.map(entry => entry.content).join('\n\n');

  const messages = [
    {
      role: "system",
      content: "You are a motivational quote generator. Create a motivational, fun, or funny quote based on the following journal entries."
    },
    {
      role: "user",
      content: `Generate a quote based on these journal entries: ${journalText}`
    }
  ];

  try {
    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 150
    });

    const quote = response.choices[0].message.content;
    res.json({ quote });
  } catch (error) {
    console.error('Error in request to Groq API:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
