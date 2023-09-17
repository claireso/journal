'use client'

import { styled } from '@theme'

export const ErrorWrapper = styled('div', {
  gridColumn: '1 / -1'
})

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorWrapper>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </ErrorWrapper>
  )
}
