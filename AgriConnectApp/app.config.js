// Dynamic Expo app config for Google OAuth and environment variables

require('dotenv').config();

export default ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    package: 'com.sevak.agriconnectapp', // <-- Replace with your real package name
  },
  extra: {
    ...config.extra,
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID || 'YOUR_WEB_CLIENT_ID',
    GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID || 'YOUR_IOS_CLIENT_ID',
    GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID || 'YOUR_ANDROID_CLIENT_ID',
  },
});