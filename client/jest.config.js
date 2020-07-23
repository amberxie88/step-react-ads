module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/serviceWorker.js',
    '!**/index.js',
  ],
};
