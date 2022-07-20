import pino from 'pino'

const logger = pino({
  browser: {
    asObject: true,
    disabled: ['production'].includes(process.env.NODE_ENV) === true
  },
  enabled: ['test'].includes(process.env.NODE_ENV) === false
})

export default logger
