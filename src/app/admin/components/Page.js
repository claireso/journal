import React from 'react'
import PropTypes from 'prop-types'

const Page = (props = {}) => {
  return (
    <main>
      <h1>{props.title}</h1>
      {props.children}
    </main>
  )
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Page
