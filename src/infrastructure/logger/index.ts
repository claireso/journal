import 'server-only'

import { Writable } from 'stream'
import { trace } from '@opentelemetry/api'
import { Logtail } from '@logtail/node'
import pino, { multistream, type Logger } from 'pino'
import pretty from 'pino-pretty'

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const streams = []

if (!isProduction) {
  streams.push({
    stream: pretty({
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    })
  })
}

if (process.env.BETTER_STACK_SOURCE_TOKEN && process.env.BETTER_STACK_INGESTING_URL) {
  const LEVELS: Record<number, string> = { 10: 'trace', 20: 'debug', 30: 'info', 40: 'warn', 50: 'error', 60: 'fatal' }

  const logtail = new Logtail(process.env.BETTER_STACK_SOURCE_TOKEN, {
    endpoint: process.env.BETTER_STACK_INGESTING_URL
  })

  const logtailStream = new Writable({
    write(chunk, _enc, callback) {
      const log = JSON.parse(chunk.toString())

      const { level, msg, ...rest } = log
      const levelStr = LEVELS[level] ?? 'info'
      logtail
        .log(msg, levelStr, { ...rest, level: levelStr })
        .then(() => callback())
        .catch(callback)
    }
  })

  streams.push({ stream: logtailStream })
}

const logger = pino(
  {
    name: 'main',
    level: process.env.LOG_LEVEL || 'info',
    enabled: !isTest,

    formatters: {
      log(object) {
        const ctx = trace.getActiveSpan()?.spanContext()

        if (!ctx) {
          return object
        }

        return {
          ...object,
          trace_id: ctx.traceId,
          span_id: ctx.spanId,
          trace_flags: ctx.traceFlags
        }
      }
    }
  },
  multistream(streams)
)

export const createContextLogger = (name: string, context?: Logger) => {
  if (!context) {
    return logger.child({ name })
  }

  return context.child({}, { msgPrefix: name })
}

export default logger
