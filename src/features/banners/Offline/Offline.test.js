import { render } from '@testing-library/react'

import { TranslationsProvider, getTranslations } from '@hooks/useTranslations'
import Offline from './index'

describe('<Offline />', () => {
  const renderBanner = () =>
    render(
      <TranslationsProvider translations={getTranslations('en', 'client')}>
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
