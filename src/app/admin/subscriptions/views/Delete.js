import React from 'react'

import Modal from '../../components/Modal'
import { ButtonLink } from '../../components/Links'

export default (props) => {
  return (
    <Modal>
      <h1>Are you sure?</h1>
      <p>This action is irreversible</p>
      <p className="align-right">
      <ButtonLink label="Cancel" className="btn--gray" onClick={ (event) => {
          event.preventDefault()
          props.navigate('/admin/subscriptions')
        } } />
        <ButtonLink label="Yes" onClick={ (event) => {
          event.preventDefault()
          props.deleteSubscription(props.id)
        } } />
      </p>
    </Modal>
  )
}