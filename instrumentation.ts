import { registerOTel } from '@vercel/otel'
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'

export function register() {
  if (!process.env.OTEL_SERVICE_NAME) return

  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME,
    instrumentations: [
      new PgInstrumentation({
        enhancedDatabaseReporting: false
      })
    ]
  })
}
