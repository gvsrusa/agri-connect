// Polyfills for Node.js core modules in React Native

// Set up global variables
if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';

// Process polyfill
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

// Set browser flag
process.browser = false;

// Buffer polyfill
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

// Set environment
const isDev = typeof __DEV__ === 'boolean' && __DEV__;
process.env.NODE_ENV = isDev ? 'development' : 'production';

// Debug settings for localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : '';
}

// Load crypto module
if (typeof global.crypto === 'undefined') {
  try {
    global.crypto = require('react-native-crypto');
  } catch (e) {
    console.warn('react-native-crypto not available:', e);
  }
}
