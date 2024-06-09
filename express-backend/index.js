// index.js or app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Import routes
const analyzeRoute = require('./routes/analyze');
const generateQuoteRoute = require('./routes/generateQuote');
const entriesRoute = require('./routes/entries');
const getEntryRoute = require('./routes/getEntry');
const chatbotRoute = require('./routes/chatbot');

// Use routes
app.use('/api', analyzeRoute);
app.use('/api', generateQuoteRoute);
app.use('/api', entriesRoute);
app.use('/api', getEntryRoute);
app.use('/api', chatbotRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
