import React from 'react'
import PropTypes from 'prop-types'

import Modal from '@admin/components/Modal'
import { PrimaryButton, SecondaryButton } from '@admin/components/Buttons'
import { Heading1 } from '@admin/components/Headings'
import Text from '@admin/components/Text'

const Delete = props => {
  const { isProcessing } = props
  return (
    <Modal onClose={() => props.navigate('/admin/photos')}>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <SecondaryButton
          onClick={event => {
            event.preventDefault()
            props.navigate('/admin/photos')
          }}
        >
          {' '}
          Cancel{' '}
        </SecondaryButton>
        <PrimaryButton
          onClick={event => {
            event.preventDefault()
            if (isProcessing) return
            props.deletePhoto(props.id)
          }}
          isLoading={ isProcessing }
        >
          {' '}
          Yes{' '}
        </PrimaryButton>
      </Text>
    </Modal>
  )
}

Delete.propTypes = {
  navigate: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isProcessing: PropTypes.bool.isRequired
}

export default Delete
