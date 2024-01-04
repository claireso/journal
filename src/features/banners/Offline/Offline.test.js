import { render } from '@testing-library/react'

import { TranslationsProvider } from '@hooks/useTranslations'
import { getTranslations } from '../../../translations'
import Offline from './index'

describe('<Offline />', () => {
  const renderBanner = () =>
    render(
      <TranslationsProvider namespace="client">
        <Offline />
      </TranslationsProvider>
    )

  it('should not render component', () => {
    const { asFragment } = renderBanner()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render component', () => {
    global.goOffline()

    const { asFragment } = renderBanner()

    expect(asFragment()).toMatchSnapshot()

    global.goOnline()
  })
})
