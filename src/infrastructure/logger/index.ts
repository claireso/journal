import pino, { Logger } from 'pino'

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const logger = pino({
  name: 'main',
  nestedKey: 'payload',
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
    disabled: isProduction
  },
  transport: !isProduction
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    : undefined,
  enabled: !isTest
})

export const createContextLogger = (name: string, context?: Logger) => {
  if (!context) {
    return logger.child({ name })
  }
  return context.child({}, { msgPrefix: name })
}

export default logger
