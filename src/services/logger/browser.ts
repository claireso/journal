import pino from 'pino'

// @TODO use browser.transmit to log on server instead of browser console
const logger = pino({
  browser: {
    asObject: true
  },
  enabled: ['production', 'test'].includes(process.env.NODE_ENV) === false
})

export default logger
