'use client'

import { Heading1 } from '@web/components/Headings'
import { ButtonPrimary } from '@web/components/Buttons'

import * as cls from './error-styles.css'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={cls.wrapper}>
      <Heading1>Something went wrong!</Heading1>
      <p>{error.digest ? `Code error: ${error.digest}` : error.message}</p>
      <ButtonPrimary onClick={reset}>Try again</ButtonPrimary>
    </div>
  )
}
