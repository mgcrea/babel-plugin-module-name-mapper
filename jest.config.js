// const {defaults} = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  setupFiles: ['<rootDir>/test/setup.js'],
  // setupFilesAfterEnv: ['<rootDir>/test/framework.ts'],
  testEnvironment: 'node'
};
