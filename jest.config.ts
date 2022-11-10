import type { Config } from 'jest';


const config: Config = {
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    './test/jest/setup.ts',
  ],
  moduleNameMapper: {
    '^@test$': '<rootDir>/test',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  rootDir: './src',
};

export default config;
