const nextJest = require('next/jest')
const baseConfig = require('./jest.base.config')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/interface/web/**/*.test.{js,ts}'],
  transform: {
    '\\.css\\.ts$': '@vanilla-extract/jest-transform'
  }
}

module.exports = createJestConfig(customJestConfig)
