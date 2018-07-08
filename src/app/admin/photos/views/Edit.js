import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../components/Modal'
import Flash from '../../components/Flash'

import Form from './form/Form'

const Edit = ({photo, ...props}) => {
  if (photo === undefined) return null

  return (
    <Modal onClose={ () => props.navigate('/admin/photos') }>
      { props.error &&
        <Flash {...props.error} />
      }
      <h1>Edit photo</h1>
      <Form onSubmit={ props.editPhoto.bind(this, photo.id) } photo={ photo } />
    </Modal>
  )
}

Edit.propTypes = {
  photo: PropTypes.object
}

export default Edit
