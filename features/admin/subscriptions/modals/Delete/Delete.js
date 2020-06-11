import { Fragment, useCallback, memo } from 'react'
import PropTypes from 'prop-types'

import { PrimaryButton, SecondaryButton } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Text from '@components/Text'

import SubscriptionsReducer from '../../reducer'

const Delete = (props) => {
  const [
    state,
    { deleteResource }
  ] = SubscriptionsReducer.useSubscriptionsReducer()
  const { onClose, id } = props

  const isProcessing = state.status === 'pending'

  const onCancel = useCallback(
    (event) => {
      event.preventDefault()
      onClose()
    },
    [onClose]
  )

  const onConfirm = useCallback(
    (event) => {
      event.preventDefault()
      if (isProcessing) return
      deleteResource(id)
    },
    [isProcessing, id, deleteResource]
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
  onClose: PropTypes.func.isRequired
}

export default memo(Delete)
