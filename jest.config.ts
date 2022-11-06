import type { Config } from 'jest';


const config: Config = {
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
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
