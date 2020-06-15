import React from 'react'
import PropTypes from 'prop-types'

const TranslationsContext = React.createContext({})

const TranslationsProvider = ({ children, translations }) => (
  <TranslationsContext.Provider value={translations}>
    {children}
  </TranslationsContext.Provider>
)

TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.object
}

const useTranslations = () => React.useContext(TranslationsContext)

export { TranslationsProvider, useTranslations }
