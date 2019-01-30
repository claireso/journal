import React from 'react'

import useIsOnline from '@common/hooks/isOnline'
import TranslationsContext from '@common/context/Translations'

import Flash from './Flash'


export default () => {
  const isOnline = useIsOnline()

  if (isOnline) return null

  return (
    <TranslationsContext.Consumer>
      {(translations) => (
        <Flash
          message={translations.offlineBanner}
        />
      )}
    </TranslationsContext.Consumer>
  )
}