const { db } = require('./lib/db');

module.exports = async () => {
  console.log('Global teardown');
  // Disconnect from the database
  try {
    await db.$disconnect();
  } catch (e) {
    console.error("Error during teardown:", e);
  }
};