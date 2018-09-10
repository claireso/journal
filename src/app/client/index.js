import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Loader from './components/Loader'

import Photos from './Photos'
import Welcome from './Welcome'

const Main = styled.main`
  max-width: var(--container-max-width);
  padding: 0 2rem;
  margin: 0 auto;

  @media (min-width: 800px) {
    padding: 0 4rem;
  }
`

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  :root {
    --text: #333;
    --primary: #8e44ad;
    --yellow: #ffe65d;
    --yellow-darken: #ffdf32;
    --gray-1: #e2dfdf;
    --gray-2: #c7c7c7;
    --gray-3: #bfbcbc;
    --gray-4: #edeff5;
    --container-max-width: 131.5rem;
  }

  body {
    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .is-hidden {
    display: none;
  }

  .notification {
    background: var(--yellow);
    bottom: 0;
    cursor: pointer;
    font-size: 1.4rem;
    left: 0;
    padding: 1rem;
    position: fixed;
    right: 0;
    transition: background 250ms ease-out;
  }

  .notification:hover {
    background: var(--yellow-darken);
  }

  .notification__inner {
    max-width: var(--container-max-width);
    margin: 0 auto;
    text-align: center;
  }
`

class Page extends React.PureComponent {
  state = {
    isLoading: true
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href)
    const page = parsedUrl.searchParams.get('page')

    this.loadPhotos(page)

    // listen history
    window.addEventListener('popstate', event => {
      window.scroll(0, 0)
      this.loadPhotos(event.state.page)
    })
  }

  async loadPhotos(page) {
    let url = '/api/photos'

    if (page !== undefined && page !== null) {
      url += `?page=${page}`
    }

    this.setState({ isLoading: true })

    const response = await fetch(url)

    if (response.status === 200) {
      const data = await response.json()

      this.setState({
        isLoading: false,
        ...data
      })

      return
    }

    // redirect to homepage
    if (window.location.search !== '') {
      window.location.href = '/'
    }
  }

  render() {
    const { items: photos, pager } = this.state

    return (
      <Main>
        <GlobalStyle />
        {this.state.isLoading ? (
          <Loader />
        ) : photos.length > 0 ? (
          <Photos photos={photos} pager={pager} />
        ) : (
          <Welcome />
        )}
      </Main>
    )
  }
}

export default Page
