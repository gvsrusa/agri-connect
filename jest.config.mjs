import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom', // Enable jsdom for React component testing
  // preset: 'ts-jest', // Keep commented out
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/messages/(.*)$': '<rootDir>/messages/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // transformIgnorePatterns removed from here
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
}

// Create the async config function from next/jest
const asyncConfig = createJestConfig(config);

// Export an async function that modifies the config after creation
export default async () => {
  const finalConfig = await asyncConfig();
  // Apply transformIgnorePatterns after the base config is created
  finalConfig.transformIgnorePatterns = [
    // Allow transformation of next-intl
    '/node_modules/(?!(next-intl))/',
    // Keep ignoring CSS modules
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return finalConfig;
};