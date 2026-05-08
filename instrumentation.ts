import { registerOTel } from '@vercel/otel'
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'

export function register() {
  if (
    !process.env.OTEL_SERVICE_NAME ||
    !process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
    !process.env.OTEL_EXPORTER_OTLP_HEADERS
  ) {
    return
  }

  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME,
    instrumentations: [new PgInstrumentation()]
  })
}
