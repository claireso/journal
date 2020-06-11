import { Fragment, memo } from 'react'

import { Heading2 } from '@components/Headings'

import Form from '../components/Form'

import PhotosReducer from '../../reducer'

const Create = () => {
  const [state, actions] = PhotosReducer.usePhotosReducer()
  const isProcessing = state.status === 'pending'

  return (
    <Fragment>
      <Heading2>Create a photo</Heading2>
      <Form onSubmit={actions.createResource} isProcessing={isProcessing} />
    </Fragment>
  )
}

export default memo(Create)
