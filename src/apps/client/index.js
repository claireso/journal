import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Styles from './Styles'

import { TranslationsProvider } from '@common/context/Translations'

import ErrorBoundary from '@common/components/ErrorBoundary'

import App from './App'

import BannerOffline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(var(--grid-number-column-small), 1fr);
  grid-gap: 2rem;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 800px) {
    grid-gap: 0 2rem;
    grid-template-columns: repeat(var(--grid-number-column-large), 1fr);
    padding-top: 4rem;
  }
`

const Page = props => {
  const { translations, items, pager } = props

  return (
    <TranslationsProvider translations={translations.client}>
      <ErrorBoundary>
        <Styles />

        <BannerOffline />
        <BannerNotifications />

        <Main>
          <App items={items} pager={pager} />
        </Main>
      </ErrorBoundary>
    </TranslationsProvider>
  )
}

Page.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object,
  translations: PropTypes.object.isRequired
}

export default Page
