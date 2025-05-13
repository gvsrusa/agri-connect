// Import fetch polyfill for Jest environment
import 'cross-fetch/polyfill';

// Polyfill TextDecoder and TextEncoder for Jest environment (Node.js)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill ReadableStream for Jest environment (Node.js >= 16.5.0 or 14.18.0 for experimental)
// Node 18+ has it globally, but Jest environment might need it explicitly.
import { ReadableStream } from 'stream/web';
global.ReadableStream = ReadableStream;

// Optional: configure or set up a testing framework before each test
// Jest ships with its own environment with basic setup
// Learn more: https://jestjs.io/docs/configuration#setuptestframeworkscriptfile-string

// Used for extending Jest's expect with testing-library matchers
import '@testing-library/jest-dom';