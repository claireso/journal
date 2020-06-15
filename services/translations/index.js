import translations from './translations.json'

export const getTranslations = (lang, namespace) => {
  const dict = translations[lang]

  if (!dict) {
    throw new Error(`Language '${lang}' is not supported by the application`)
  }

  if (!namespace) return dict

  const trans = dict[namespace]

  if (!trans) {
    throw new Error(
      `Namespace '${namespace}' is not defined for the language ${lang}`
    )
  }

  return trans
}
