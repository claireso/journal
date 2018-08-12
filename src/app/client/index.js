import React from 'react'
import PropTypes from 'prop-types'

import Loader from './components/Loader'

import Photos from './Photos'
import Welcome from './Welcome'

class Page extends React.Component {

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href)
    const page = parsedUrl.searchParams.get('page')

    this.loadPhotos(page)

    // listen history
    window.addEventListener('popstate', (event) => {
      window.scroll(0, 0)
      this.loadPhotos(event.state.page)
    })
  }

  async loadPhotos(page) {
    let url = '/api/photos'

    if (page !== undefined && page !== null) {
      url += `?page=${page}`
    }

    this.setState({isLoading: true})

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
      <main>
        { this.state.isLoading ?
          <Loader />
          :
          photos.length > 0 ?
            <Photos photos={photos} pager={pager} />
            :
            <Welcome />
        }
      </main>
    )
  }
}

Page.propTypes = {
  // photos: PropTypes.array.isRequired
}

export default Page
