const { db } = require('./lib/db');
require('dotenv').config({ path: '.env.test' });

process.env.NODE_ENV = 'test';

module.exports = async () => {
  console.log('Global setup');
  // Connect to the database
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable not set. Please check your .env.test file.");
  }
  await db.$connect();
};