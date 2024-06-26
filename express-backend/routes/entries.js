// routes/entries.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const router = express.Router();

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

router.get('/entries', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .gte('date_time', new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString())
      .order('date_time', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
