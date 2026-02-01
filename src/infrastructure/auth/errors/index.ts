export enum AUTH_ERROR_TYPES {
  'UNAUTHORIZED' = 401,
  'DEFAULT' = 500
}

export const AUTH_ERRORS = {
  [AUTH_ERROR_TYPES.UNAUTHORIZED]: {
    title: 'Unauthorized',
    message: 'Bad username/password'
  },
  [AUTH_ERROR_TYPES.DEFAULT]: {
    title: 'Internal error',
    message: 'Ooops, an error occured, please retry'
  }
}

export const getAuthError = (errorType: AUTH_ERROR_TYPES | null) => {
  if (!errorType) {
    return null
  }
  return AUTH_ERRORS[errorType] ?? AUTH_ERRORS[AUTH_ERROR_TYPES.DEFAULT]
}
