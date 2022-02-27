module.exports = {
  rootDir  : './src',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
	setupFiles: [
		'./js/test/jest/setup.ts',
	],
};
