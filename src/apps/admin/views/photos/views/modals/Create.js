import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Flash from '@admin/components/Flash'
import { Heading1 } from '@admin/components/Headings'

import Form from './form/Form'

const Create = props => {
  return (
    <Fragment>
      {props.error && <Flash {...props.error} />}
      <Heading1>Create a photo</Heading1>
      <Form onSubmit={props.createPhoto} isProcessing={props.isProcessing} />
    </Fragment>
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
