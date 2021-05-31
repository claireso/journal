import { Fragment, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'

import { Heading1 } from '@components/Headings'

import Form from '../components/Form'

import PhotosReducer from '../../reducer'

const Edit = ({ id }) => {
  const [state, { loadResource, editResource }] =
    PhotosReducer.usePhotosReducer()

  const isProcessing = state.status === 'pending'

  let photo = state.items.find((p) => p.id === id)

  if (!photo) {
    photo = state.single?.id === id ? state.single : undefined
  }

  useEffect(() => {
    if (!photo) {
      loadResource(id)
    }
  }, [id, photo, loadResource])

  const onSubmit = useCallback(
    (data) => {
      editResource(id, data)
    },
    [id, editResource]
  )

  if (photo === undefined) return null

  return (
    <Fragment>
      <Heading1>Edit photo</Heading1>
      <Form onSubmit={onSubmit} photo={photo} isProcessing={isProcessing} />
    </Fragment>
  )
}

Edit.propTypes = {
  id: PropTypes.number.isRequired
}

export default memo(Edit)
