import React, { useContext } from 'react'

import useIsOnline from '@common/hooks/isOnline'
import TranslationsContext from '@common/context/Translations'

import Flash from '../../Flash'

const BannerOffline = () => {
  const isOnline = useIsOnline()
  const translations = useContext(TranslationsContext)

  if (isOnline) return null

  return <Flash>{translations.bannerOffline}</Flash>
}

export default BannerOffline
