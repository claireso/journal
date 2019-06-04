import React from 'react'
import { render } from '@testing-library/react'

import { TranslationsProvider } from '@common/context/Translations'
import Offline from '../index'

describe('<Offline />', () => {
  test('should not render component', () => {
    const { container } = render(
      <TranslationsProvider translations={global.__TRANSLATIONS__.client}>
        <Offline />
      </TranslationsProvider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render component', () => {
    global.goOffline()

    const { container } = render(
      <TranslationsProvider translations={global.__TRANSLATIONS__.client}>
        <Offline />
      </TranslationsProvider>
    )

    expect(container).toMatchSnapshot()

    global.goOnline()
  })
})
