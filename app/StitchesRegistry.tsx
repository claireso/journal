'use client'

import React, { useRef } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { getCssText } from '@theme'

const StitchesRegistry = ({ children }: { children: React.ReactNode }) => {
  const mounted = useRef(false)
  useServerInsertedHTML(() => {
    if (!mounted.current) {
      mounted.current = true
      return <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    }
  })

  return <>{children}</>
}

export default StitchesRegistry
