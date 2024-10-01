'use client'

import React from 'react'

import { useTranslations } from '@web/hooks/useTranslations'
import useIsOnline from '@web/hooks/useIsOnline'

import Flash from '@web/components/Flash'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useTranslations()

  if (isOnline) return null

  return (
    <Flash status="info" css={{ mb: 0 }}>
      {/* @ts-ignore */}
      {translations.bannerOffline}
    </Flash>
  )
}

export default BannerOffline