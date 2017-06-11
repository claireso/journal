import React from 'react'
import Form from './form/Form'

export default ({ photo }) => {
  return (
    <main>
      <h1>New photo</h1>
      <Form photo={ photo } />
    </main>
  )
}
