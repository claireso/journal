import React from 'react'
import styled from 'styled-components'

import Styles from './Styles'
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
        <Styles />
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
