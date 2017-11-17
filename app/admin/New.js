import React from 'react'
import PropTypes from 'prop-types'

import Form from './form/Form'

const New = ({ photo }) => {
  return (
    <main>
      <h1>New photo</h1>
      <p>
        <a className="link" href="/admin/photos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 32 32"
          >
            <path d="M32 14.286v3.43q0 .25-.16.41t-.412.16H9.142v4q0 .376-.34.52t-.624-.09l-6.857-6.25q-.178-.18-.178-.41 0-.25.18-.43l6.856-6.32q.286-.25.625-.108.34.16.34.518v4h22.285q.25 0 .41.16t.162.412z"/>
          </svg>
          Back to list
        </a>
      </p>
      <Form photo={ photo } />
    </main>
  )
}

New.propTypes = {
  photo: PropTypes.object
}

export default New