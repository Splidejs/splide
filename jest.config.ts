import type { JestConfigWithTsJest } from 'ts-jest/dist/types';


const config: JestConfigWithTsJest = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    './js/test/jest/setup.ts',
  ],
  moduleNameMapper: {
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  rootDir: './src',
};

export default config;
