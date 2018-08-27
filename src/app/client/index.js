import React from 'react'

import Loader from './components/Loader'

import Photos from './Photos'
import Welcome from './Welcome'

import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    color: #333;
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .is-hidden {
    display: none;
  }

  .notification {
    background: #FFE65D;
    bottom: 0;
    cursor: pointer;
    font-size: 1.4rem;
    left: 0;
    padding: 10px;
    position: fixed;
    right: 0;
    transition: background 250ms ease-out;
  }

  .notification:hover {
    background: #ffdf32;
  }

  .notification__inner {
    max-width: 131.5rem;
    margin: 0 auto;
    text-align: center;
  }
`

const Main = styled.main`
  max-width: 131.5rem;
  padding: 0 2rem;
  margin: 0 auto;

  @media (min-width: 800px) {
    padding: 0 4rem;
  }
`

class Page extends React.Component {
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
