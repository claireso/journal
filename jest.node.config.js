const nextJest = require('next/jest')
const baseConfig = require('./jest.base.config')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  ...baseConfig,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/infrastructure/**/*.test.{js,ts}',
    '<rootDir>/src/application/**/*.test.{js,ts}',
    '<rootDir>/src/utils/**/*.test.{js,ts}'
  ]
}

module.exports = createJestConfig(customJestConfig)
