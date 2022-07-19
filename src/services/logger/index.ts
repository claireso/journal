import pino from 'pino'

const logger = pino({
  browser: {
    asObject: true,
    disabled: ['production', 'test'].includes(process.env.NODE_ENV) === true
  }
})

export default logger
