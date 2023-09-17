'use client'

import React from 'react'
import PropTypes from 'prop-types'

import translations from '../translations.json'

const TranslationsContext = React.createContext({})

type Translations = {
  [key: string]: object | string
}

interface TranslationsProviderProps {
  children: React.ReactNode
  namespace: 'client' | 'admin'
}

export const TranslationsProvider = ({ children, namespace }: TranslationsProviderProps) => {
  const translations = getTranslations(process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE, namespace)

  return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
}

TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.object
}

export const useTranslations = (): Translations => React.useContext(TranslationsContext)

export const getTranslations = (lang: string = '', namespace: string = '') => {
  const dict = translations[lang as keyof typeof translations]

  if (!dict) {
    throw new Error(`Language '${lang}' is not supported by the application`)
  }

  if (!namespace) return dict

  const trans = dict[namespace as keyof typeof dict]

  if (!trans) {
    throw new Error(`Namespace '${namespace}' is not defined for the language ${lang}`)
  }

  return trans
}
