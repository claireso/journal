export enum AUTH_ERRORS_TYPES {
  'CREDENTIALS_SIGNIN' = 'CredentialsSignin',
  'ACCESS_DENIED' = 'AccessDenied',
  'VERIFICATION' = 'Verification',
  'DEFAULT' = 'Default'
}

export const AUTH_ERRORS = {
  [AUTH_ERRORS_TYPES.ACCESS_DENIED]: {
    title: 'Access Denied',
    message: 'You do not have permission to sign in.'
  },
  [AUTH_ERRORS_TYPES.VERIFICATION]: {
    title: 'Unable to sign in',
    message: 'The sign in link is no longer valid. It may have been used already or it may have expired.'
  },
  [AUTH_ERRORS_TYPES.CREDENTIALS_SIGNIN]: {
    title: 'Unauthorized',
    message: 'Bad username/password'
  },
  [AUTH_ERRORS_TYPES.DEFAULT]: {
    title: 'Internal error',
    message: 'Ooops, an error occured, please retry'
  }
}

export const getAuthError = (errorType: AUTH_ERRORS_TYPES | null) => {
  if (!errorType) {
    return null
  }
  return AUTH_ERRORS[errorType] ?? AUTH_ERRORS[AUTH_ERRORS_TYPES.DEFAULT]
}
