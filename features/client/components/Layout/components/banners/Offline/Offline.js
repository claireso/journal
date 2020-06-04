import React from 'react'

import { useTranslations } from '@utils/hooks/useTranslations'

import Flash from '@components/Flash'

import useIsOnline from './hooks/useIsOnline'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useTranslations()

  if (isOnline) return null

  return <Flash status="default">{translations.bannerOffline}</Flash>
}

export default BannerOffline
