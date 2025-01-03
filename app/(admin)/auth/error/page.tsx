import { getAuthError, AUTH_ERRORS_TYPES } from '@infrastructure/auth/errors'
import { Heading1 } from '@web/components/Headings'

type ErrorPageProps = object

const ErrorPage = async ({ searchParams }: NextPageProps<ErrorPageProps>) => {
  const { error: errorType } = await searchParams
  const error = getAuthError((errorType as AUTH_ERRORS_TYPES) ?? 'default')

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
