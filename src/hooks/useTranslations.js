import React from 'react'
import PropTypes from 'prop-types'

import translations from '../translations.json'

const TranslationsContext = React.createContext({})

export const TranslationsProvider = ({ children, translations }) => (
  <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
)

TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.object
}

export const useTranslations = () => React.useContext(TranslationsContext)

export const getTranslations = (lang, namespace) => {
  const dict = translations[lang]

  if (!dict) {
    throw new Error(`Language '${lang}' is not supported by the application`)
  }

  if (!namespace) return dict

  const trans = dict[namespace]

  if (!trans) {
    throw new Error(`Namespace '${namespace}' is not defined for the language ${lang}`)
  }

  return trans
}
