'use client'

import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { getCssText } from '@theme'

const StitchesRegistry = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => {
    if (typeof window === 'undefined') {
      return <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    }
  })

  return <>{children}</>
}

export default StitchesRegistry
