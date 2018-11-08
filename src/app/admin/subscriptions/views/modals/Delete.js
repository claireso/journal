import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { PrimaryButton, SecondaryButton } from '@admin/components/Buttons'
import { Heading1 } from '@admin/components/Headings'
import Text from '@admin/components/Text'

const Delete = ({ isProcessing, ...props }) => {
  return (
    <Fragment>
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
