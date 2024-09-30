'use client'

import React from 'react'
import PropTypes from 'prop-types'

import { getTranslations } from '@infrastructure/translations'

const TranslationsContext = React.createContext({})

type Translations = {
  [key: string]: object | string
}

interface TranslationsProviderProps {
  children: React.ReactNode
  namespace: 'client' | 'admin'
  lang?: string
}

export const TranslationsProvider = ({ children, namespace, lang }: TranslationsProviderProps) => {
  const translations = getTranslations(lang ?? 'en', namespace)

  return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
}

TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.object
}

export const useTranslations = (): Translations => React.useContext(TranslationsContext)
