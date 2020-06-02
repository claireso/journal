import { Fragment, memo } from 'react'
import PropTypes from 'prop-types'

import { Heading2 } from '@components/admin/Headings'

import Form from '../components/Form'

import { usePhotosReducer } from '../../reducer'

const Create = () => {
  const [state, actions] = usePhotosReducer()
  const isProcessing = state.status === 'pending'

  return (
    <Fragment>
      <Heading2>Create a photo</Heading2>
      <Form onSubmit={actions.createResource} isProcessing={isProcessing} />
    </Fragment>
  )
}

Create.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default memo(Create)
