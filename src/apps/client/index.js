import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Styles from './Styles'

import { TranslationsProvider } from '@common/context/Translations'

import App from './App'

import BannerOffline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const Main = styled.main`
  max-width: var(--container-max-width);
  padding: 0 2rem;
  margin: 0 auto;

  @media (min-width: 800px) {
    padding: 0 4rem;
  }
`

const Page = props => {
  const { translations, items, pager } = props

  return (
    <TranslationsProvider translations={translations.client}>
      <Styles />

      <BannerOffline />
      <BannerNotifications />

      <Main>
        <App items={items} pager={pager} />
      </Main>
    </TranslationsProvider>
  )
}

Page.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object,
  translations: PropTypes.object.isRequired
}

export default Page
