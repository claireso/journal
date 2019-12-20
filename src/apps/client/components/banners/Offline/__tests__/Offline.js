import React from 'react'
import { render } from '@testing-library/react'

import { TranslationsProvider } from '@common/context/Translations'
import Offline from '../index'

describe('<Offline />', () => {
  const renderBanner = () =>
    render(
      <TranslationsProvider translations={global.__TRANSLATIONS__.client}>
        <Offline />
      </TranslationsProvider>
    )

  test('should not render component', () => {
    const { container } = renderBanner()

    expect(container).toMatchSnapshot()
  })

  test('should render component', () => {
    global.goOffline()

    const { container } = renderBanner()

    expect(container).toMatchSnapshot()

    global.goOnline()
  })
})
