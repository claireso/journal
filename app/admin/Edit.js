import React from 'react'
import Form from './form/Form'

const Edit = ({ photo }) => {
  return (
    <main>
      <h1>Edit photo</h1>
      <Form photo={ photo } />
    </main>
  )
}

module.exports = Edit