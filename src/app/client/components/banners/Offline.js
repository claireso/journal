import React from 'react'

import useIsOnline from '@common/hooks/isOnline'
import TranslationsContext from '@common/context/Translations'

import Flash from '../Flash'

const BannerOffline = () => {
  const isOnline = useIsOnline()

  if (isOnline) return null

  return (
    <TranslationsContext.Consumer>
      {translations => <Flash>{translations.bannerOffline}</Flash>}
    </TranslationsContext.Consumer>
  )
}

export default BannerOffline
