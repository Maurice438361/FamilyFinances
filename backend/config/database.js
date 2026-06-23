/**
 * Database Configuration
 * 
 * This file:
 * 1. Loads environment variables from .env
 * 2. Connects to MongoDB
 * 3. Handles connection errors
 * 4. Exports mongoose for use in other files
 * 
 * SEPARATION OF CONCERN:
 * This file ONLY handles database setup.
 * It doesn't know about HTTP, routes, or business logic.
 * Other files import this to use the connection.
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Get MongoDB URI from .env.local file
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

/**
 * Connect to MongoDB
 * 
 * mongoose.connect() returns a Promise
 * - If success: resolves with connection object
 * - If fails: rejects with error
 */
mongoose.connect(MONGODB_URI, {
  // Options for connection
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit if can't connect to DB
  });

/**
 * Listen to connection events
 * (helpful for debugging)
 */
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

// Export mongoose so other files can use it
module.exports = mongoose;
