'use client'

import { useEffect } from 'react'
import Flash from '@web/components/Flash'

import * as cls from './styles.css'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Flash status="error" className={cls.flashError}>
      Something went wrong. Please{' '}
      <button className={cls.buttonErrorReset} onClick={() => reset()}>
        retry
      </button>
    </Flash>
  )
}
