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
  // testEnvironment: 'jest-environment-jsdom', // Remove this line to use default Node env for API tests
  // preset: 'ts-jest', // next/jest handles TS transformation via Babel
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases (this will be automatically configured based on jsconfig.json/tsconfig.json)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/messages/(.*)$': '<rootDir>/messages/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transformIgnorePatterns: [
    // Ignore node_modules except for specific ESM packages that need transformation
    '/node_modules/(?!(next-intl))/', // Ensure next-intl is NOT ignored
    '^.+\\.module\\.(css|sass|scss)$', // Keep ignoring CSS modules
  ],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)