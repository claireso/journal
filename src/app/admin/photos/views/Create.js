import React from 'react'

import Modal from '../../components/Modal'

import Form from './form/Form'

export default (props) => {
  return (
    <Modal onClose={ () => props.navigate('/admin/photos') }>
      <h1>Create a photo</h1>
      <Form />
    </Modal>
  )
}