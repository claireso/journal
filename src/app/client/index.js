import React from 'react'
import PropTypes from 'prop-types'

import Photos from './Photos'
import Welcome from './Welcome'

const Page = (props = {}) => {
  return (
    <main>
      { props.photos && props.photos.length > 0 ?
          <Photos {...props} />
        :
        <Welcome />
      }
    </main>
  )
}

Page.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Page