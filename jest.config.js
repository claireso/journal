const nextJest = require('next/jest')
const baseConfig = require('./jest.base.config')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/interface/web/**/*.test.{js,ts,tsx}', '<rootDir>/src/utils/**/*.test.{js,ts}']
}

module.exports = async (...args) => {
  const config = await createJestConfig(customJestConfig)(...args)

  delete config.moduleNameMapper['^.+\\.(css|sass|scss)$']
  config.transform = {
    // we must insert the transformer in the first position,
    // otherwise @vanilla-extract/recipes throws an error
    // https://github.com/vanilla-extract-css/vanilla-extract/issues/1131
    '^.+\\.css\\.ts$': '@vanilla-extract/jest-transform',
    ...config.transform
  }
  return config
}
