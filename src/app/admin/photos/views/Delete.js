import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../components/Modal'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons'
import { Heading1 } from '../../components/Headings'
import Text from '../../components/Text'

const Delete = props => {
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
            props.deletePhoto(props.id)
          }}
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
  id: PropTypes.string.isRequired
}

export default Delete
