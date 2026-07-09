'use client'

import React from 'react'

import Flash from '@web/components/Flash'
import useIsOnline from '@web/hooks/useIsOnline'
import { useTranslations } from '@web/hooks/useTranslations'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useTranslations()

  if (isOnline) return null

  return <Flash status="info">{translations.bannerOffline as string}</Flash>
}

export default BannerOffline
