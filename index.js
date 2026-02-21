/***************
 * Affirmations API
 * A simple API that serves random affirmations to clients. Built with Node.js and Express.
 * 
 * Features:
 * - CORS enabled for all origins
 * - Rate limiting: 120 requests per minute per IP
 * - Random affirmation endpoint: GET /affirmation
 * - Reasons are loaded from a JSON file (affirmations.json)
 * @author Constant Pagoui
 * @license MIT
 */

const express = require('express');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
app.use(cors());
app.set('trust proxy', true);
const PORT = process.env.PORT || 8000;

// Get affirmations from JSON file
const affirmations = JSON.parse(fs.readFileSync('./affirmations.json', 'utf-8'));

// Rate limiter: 100 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  keyGenerator: (req, res) => {
    return req.headers['cf-connecting-ip'] || req.ip; // Fallback if header missing (or for non-CF)
  },
  message: { error: "Request limit exceeded, please try again later. (100 reqs/min/IP)" }
});

app.use(limiter);

// Random affirmation endpoint
app.get('/affirmation', (req, res) => {
  const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  res.json({ affirmation });
});

// Start server
app.listen(PORT, () => {
  console.log(`Affirmations API is running on port ${PORT}`);
});