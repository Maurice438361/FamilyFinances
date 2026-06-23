require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
require('./config/database');

const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware
 */
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

/**
 * Routes
 */
app.use('/api/transactions', transactionRoutes);

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
