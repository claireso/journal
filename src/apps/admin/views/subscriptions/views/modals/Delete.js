import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import { PrimaryButton, SecondaryButton } from '@admin/components/Buttons'
import { Heading1 } from '@admin/components/Headings'
import Text from '@admin/components/Text'

const Delete = ({ isProcessing, id, deleteSubscription, onClose }) => {
  const onCancel = useCallback(
    event => {
      event.preventDefault()
      onClose()
    },
    [onClose]
  )

  const onConfirm = useCallback(
    event => {
      event.preventDefault()
      if (isProcessing) return
      deleteSubscription(id)
    },
    [isProcessing, id, deleteSubscription]
  )

  return (
    <Fragment>
      <Heading1>Are you sure?</Heading1>
      <p>This action is irreversible</p>
      <Text align="right">
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        <PrimaryButton onClick={onConfirm} isLoading={isProcessing}>
          Yes
        </PrimaryButton>
      </Text>
    </Fragment>
  )
}

Delete.propTypes = {
  id: PropTypes.number.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Delete
