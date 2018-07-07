import React from 'react'

import Modal from '../../components/Modal'
import Flash from '../../components/Flash'

import Form from './form/Form'

export default (props) => {
  return (
    <Modal onClose={ () => props.navigate('/admin/photos') }>
      { props.error &&
        <Flash {...props.error} />
      }
      <h1>Create a photo</h1>
      <Form onSubmit={ props.createPhoto } />
    </Modal>
  )
}