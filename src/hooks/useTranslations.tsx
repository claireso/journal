'use client'

import React from 'react'
import PropTypes from 'prop-types'

import { getTranslations } from '../translations'

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
