import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../components/Modal'
import Flash from '../../components/Flash'

import Form from './form/Form'

class Edit extends React.Component {

  componentDidMount() {
    if (!this.props.photo) {
      this.props.loadPhoto(this.props.id)
    }
  }

  render() {
    const { photo, error } = this.props

    if (photo === undefined) return null

    return (
      <Modal onClose={ () => this.props.navigate('/admin/photos') }>
        { error &&
          <Flash {...error} />
        }
        <h1>Edit photo</h1>
        <Form onSubmit={ this.props.editPhoto.bind(this, photo.id) } photo={ photo } />
      </Modal>
    )
  }
}

Edit.propTypes = {
  photo: PropTypes.object
}

export default Edit
