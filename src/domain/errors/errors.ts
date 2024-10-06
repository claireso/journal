export class JournalError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

// HTTP 400
export class BadRequestError extends JournalError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

// HTTP 404
export class NotFoundError extends JournalError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

// HTTP 422
export class UnprocessableEntityError extends JournalError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}
