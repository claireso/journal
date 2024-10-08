import { getAuthError, AUTH_ERRORS_TYPES } from '@infrastructure/auth/errors'
import { Heading1 } from '@web/components/Headings'

const ErrorPage = ({ searchParams }: NextPageProps<{}>) => {
  const errorType = searchParams.error as AUTH_ERRORS_TYPES
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
