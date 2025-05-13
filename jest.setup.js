const { db } = require('./lib/db');
const fetchMock = require('jest-fetch-mock');

require('dotenv').config({ path: '.env.test' });
process.env.NODE_ENV = 'test';
require('setimmediate'); // Re-add setimmediate polyfill

module.exports = async () => {
  fetchMock.enableMocks();
  global.fetch = fetchMock;

  console.log('Global setup with fetch mock and setImmediate polyfill enabled.');
  // Connect to the database
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable not set. Please check your .env.test file.");
  }
  await db.$connect();
};