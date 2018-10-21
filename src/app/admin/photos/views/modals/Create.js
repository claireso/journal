import React from 'react'
import PropTypes from 'prop-types'

import Modal from '@admin/components/Modal'
import Flash from '@admin/components/Flash'
import { Heading1 } from '@admin/components/Headings'

import Form from './form/Form'

const Create = props => {
  return (
    <Modal onClose={() => props.onClose()}>
      {props.error && <Flash {...props.error} />}
      <Heading1>Create a photo</Heading1>
      <Form onSubmit={props.createPhoto} isProcessing={props.isProcessing} />
    </Modal>
  )
}

Create.propTypes = {
  createPhoto: PropTypes.func.isRequired,
  error: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  isProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Create
