'use client'

import { useSearchParams } from 'next/navigation'

import { Heading1 } from '@components/Headings'
import { getAuthError, AUTH_ERRORS_TYPES } from '@services/auth/errors'

const ErrorPage = () => {
  const searchParams = useSearchParams()
  const errorType = searchParams?.get('error') as AUTH_ERRORS_TYPES

  const error = getAuthError(errorType ?? 'default')

  if (!error) {
    return null
  }

  return (
    <>
      <Heading1>{error.title}</Heading1>
      <p>{error.message}</p>
    </>
  )
}

export default ErrorPage
