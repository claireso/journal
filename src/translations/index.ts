import translations from './translations.json'

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
