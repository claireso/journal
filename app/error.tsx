'use client'

import { styled } from '@theme'
import { Heading1 } from '@components/Headings'
import { ButtonPrimary } from '@components/Buttons'

export const ErrorWrapper = styled('div', {
  padding: '$5'
})

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorWrapper>
      <Heading1>Something went wrong!</Heading1>
      <p>{error.digest ? `Code error: ${error.digest}` : error.message}</p>
      <ButtonPrimary onClick={reset}>Try again</ButtonPrimary>
    </ErrorWrapper>
  )
}
