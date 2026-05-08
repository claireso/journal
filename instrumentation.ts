import { registerOTel } from '@vercel/otel'

export function register() {
  if (
    !process.env.OTEL_SERVICE_NAME ||
    !process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
    !process.env.OTEL_EXPORTER_OTLP_HEADERS
  ) {
    return
  }

  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME
  })
}
