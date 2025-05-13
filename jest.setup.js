// Polyfill for fetch and related Web APIs like Response, Headers, Request
require('whatwg-fetch'); // This should make Response.json globally available

const { db } = require('./lib/db');
// const fetchMock = require('jest-fetch-mock'); // Temporarily commented out to diagnose Response.json issue

require('dotenv').config({ path: '.env.test' });
process.env.NODE_ENV = 'test';
require('setimmediate'); // Re-add setimmediate polyfill

module.exports = async () => {
  // fetchMock.enableMocks(); // Temporarily commented out
  // global.fetch = fetchMock; // Temporarily commented out

  console.log('Global setup with setImmediate polyfill enabled. Fetch mock temporarily disabled to diagnose Response.json issue.');
  // Connect to the database
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable not set. Please check your .env.test file.");
  }
  await db.$connect();
};