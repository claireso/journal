import pino from 'pino'

const logger = pino({
  browser: {
    asObject: true,
    disabled: ['production'].includes(process.env.NODE_ENV) === true
  },
  transport:
    ['production'].includes(process.env.NODE_ENV) === false
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
      : undefined,
  enabled: ['test'].includes(process.env.NODE_ENV) === false
})

export default logger
