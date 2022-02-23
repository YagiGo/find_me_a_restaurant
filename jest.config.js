/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ignore cypress test
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
