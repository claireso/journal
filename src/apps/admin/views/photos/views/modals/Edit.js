import React, { Fragment, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import Flash from '@admin/components/Flash'
import { Heading1 } from '@admin/components/Headings'

import Form from './form/Form'

const Edit = ({ id, photo, error, isProcessing, loadPhoto, editPhoto }) => {
  useEffect(() => {
    if (!photo) {
      loadPhoto(id)
    }
  }, [id, loadPhoto, photo])

  const onSubmit = useCallback(
    data => {
      editPhoto(id, data)
    },
    [editPhoto, id]
  )

  if (photo === undefined) return null

  return (
    <Fragment>
      {error && <Flash {...error} />}
      <Heading1>Edit photo</Heading1>
      <Form onSubmit={onSubmit} photo={photo} isProcessing={isProcessing} />
    </Fragment>
  )
}

Edit.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  editPhoto: PropTypes.func.isRequired,
  loadPhoto: PropTypes.func.isRequired,
  photo: PropTypes.object,
  isProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default Edit
