'use strict'

const build = require('pino-abstract-transport')
const { Logtail } = require('@logtail/node')

const LEVELS = { 10: 'trace', 20: 'debug', 30: 'info', 40: 'warn', 50: 'error', 60: 'fatal' }

module.exports = async function (opts) {
  const logtail = new Logtail(opts.sourceToken, {
    endpoint: opts.options?.endpoint
  })

  return build(
    async function (source) {
      for await (const obj of source) {
        const levelStr = LEVELS[obj.level] ?? 'info'
        const { level, msg, ...rest } = obj
        await logtail.log(msg, levelStr, { ...rest, level: levelStr })
      }
    },
    { async: true }
  )
}
