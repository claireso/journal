import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../components/Modal'
import { ButtonLink } from '../../components/Links'

const Delete = props => {
  return (
    <Modal>
      <h1>Are you sure?</h1>
      <p>This action is irreversible</p>
      <p className="align-right">
        <ButtonLink
          label="Cancel"
          className="btn--gray"
          onClick={event => {
            event.preventDefault()
            props.navigate('/admin/photos')
          }}
        />
        <ButtonLink
          label="Yes"
          onClick={event => {
            event.preventDefault()
            props.deletePhoto(props.id)
          }}
        />
      </p>
    </Modal>
  )
}

Delete.propTypes = {
  navigate: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default Delete
