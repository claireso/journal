import React from 'react'
import PropTypes from 'prop-types'

import Modal from '@admin/components/Modal'
import { PrimaryButton, SecondaryButton } from '@admin/components/Buttons'
import { Heading1 } from '@admin/components/Headings'
import Text from '@admin/components/Text'

const Delete = ({ isProcessing, ...props }) => {
  return (
    <Modal onClose={() => props.onClose()}>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <SecondaryButton
          onClick={event => {
            event.preventDefault()
            props.onClose()
          }}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={event => {
            event.preventDefault()
            if (isProcessing) return
            props.deleteSubscription(props.id)
          }}
          isLoading={isProcessing}
        >
          Yes
        </PrimaryButton>
      </Text>
    </Modal>
  )
}

Delete.propTypes = {
  id: PropTypes.number.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Delete
