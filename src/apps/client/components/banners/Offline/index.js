import React from 'react'

import useIsOnline from '@common/hooks/isOnline'
import { useTranslations } from '@common/context/Translations'

import Flash from '../../Flash'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useTranslations()

  if (isOnline) return null

  return <Flash>{translations.bannerOffline}</Flash>
}

export default BannerOffline
