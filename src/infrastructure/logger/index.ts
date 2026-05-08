import 'server-only'

import path from 'path'
import { trace } from '@opentelemetry/api'
import pino, { type Logger, type TransportTargetOptions } from 'pino'

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

function buildTransport() {
  const targets: TransportTargetOptions[] = []

  if (!isProduction) {
    targets.push({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname'
      }
    })
  }

  if (process.env.BETTER_STACK_SOURCE_TOKEN && process.env.BETTER_STACK_INGESTING_URL) {
    targets.push({
      target: path.join(process.cwd(), 'logtail.transport.js'),
      options: {
        sourceToken: process.env.BETTER_STACK_SOURCE_TOKEN,
        options: { endpoint: process.env.BETTER_STACK_INGESTING_URL }
      }
    })
  }

  return targets.length > 0 ? { targets } : undefined
}

const logger = pino({
  name: 'main',
  level: process.env.LOG_LEVEL || 'info',
  enabled: !isTest,
  formatters: {
    log(object) {
      const ctx = trace.getActiveSpan()?.spanContext()
      if (!ctx) return object
      return { ...object, trace_id: ctx.traceId, span_id: ctx.spanId, trace_flags: ctx.traceFlags }
    }
  },
  transport: buildTransport()
})

export const createContextLogger = (name: string, context?: Logger) => {
  if (!context) return logger.child({ name })
  return context.child({}, { msgPrefix: name })
}

export default logger
