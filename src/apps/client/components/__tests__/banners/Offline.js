import React from 'react'
import { render } from 'react-testing-library'

import TranslationsContext from '../../../../common/context/Translations'
import Offline from '../../banners/Offline'

describe('<Offline />', () => {
  test('should not render component', () => {
    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Offline />
      </TranslationsContext.Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render component', () => {
    goOffline()

    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Offline />
      </TranslationsContext.Provider>
    )

    expect(container).toMatchSnapshot()

    goOnline()
  })
})
