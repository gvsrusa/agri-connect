const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Use the polyfills defined in package.json
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  // Core Node.js modules
  events: require.resolve('events'),
  stream: require.resolve('stream-browserify'),
  buffer: require.resolve('buffer'),
  util: require.resolve('util'),
  url: require.resolve('url'),
  assert: require.resolve('assert'),
  process: require.resolve('process'),
  https: require.resolve('https-browserify'),
  http: require.resolve('@tradle/react-native-http'),
  crypto: require.resolve('react-native-crypto'),
  net: require.resolve('react-native-tcp'),
  tls: false, // Explicitly disable TLS
  fs: require.resolve('react-native-level-fs'),
  zlib: require.resolve('browserify-zlib'),
  path: require.resolve('path-browserify'),
  querystring: require.resolve('querystring-es3'),
  os: require.resolve('react-native-os'),
  timers: require.resolve('timers-browserify'),
  vm: require.resolve('vm-browserify'),
  console: require.resolve('console-browserify'),
  constants: require.resolve('constants-browserify'),
  domain: require.resolve('domain-browser'),
  dgram: require.resolve('react-native-udp'),
  dns: require.resolve('dns.js'),
  tty: require.resolve('tty-browserify'),
  // Use our mock implementation for the 'ws' package
  ws: path.resolve(__dirname, 'src/mocks/ws.js'),
};

// Configure module resolution to use our mock for the 'ws' package
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Add additional resolver for specific modules
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'cjs', 'json'];

const exclusionList = require('metro-config/src/defaults/exclusionList');

// Block problematic Node modules from being bundled
config.resolver.blockList = exclusionList([
  /node_modules\/ws\/.*/,
  /node_modules\/tls\/.*/,
  /node_modules\/net\/.*/,
  /node_modules\/http\/.*/,
  /node_modules\/https\/.*/,
  /node_modules\/zlib\/.*/,
  /node_modules\/fs\/.*/,
  /node_modules\/child_process\/.*/,
]);

module.exports = config;