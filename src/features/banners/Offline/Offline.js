import React from 'react'

import { useTranslations } from '@hooks/useTranslations'
import useIsOnline from '@hooks/useIsOnline'

import Flash from '@components/Flash'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useTranslations()

  if (isOnline) return null

  return (
    <Flash status="info" css={{ mb: 0 }}>
      {translations.bannerOffline}
    </Flash>
  )
}

export default BannerOffline
