// const {defaults} = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  setupFiles: ['<rootDir>/test/setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  // coveragePathIgnorePatterns: ["/node_modules/"],
  // setupFilesAfterEnv: ['<rootDir>/test/framework.ts'],
  testEnvironment: 'node'
};
