require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const transactionRoutes = require('./routes/transactions');

const app = express();

/**
 * PORT (Render provides this automatically)
 */
const PORT = process.env.PORT || 3001;

/**
 * DATABASE CONNECTION
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

/**
 * MIDDLEWARE
 */
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  })
);

/**
 * ROUTES
 */
app.use('/api/transactions', transactionRoutes);

/**
 * HEALTH CHECK
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
/**/
module.exports = app;