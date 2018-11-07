import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Flash from '@admin/components/Flash'
import { Heading1 } from '@admin/components/Headings'

import Form from './form/Form'

class Edit extends React.PureComponent {
  componentDidMount() {
    if (!this.props.photo) {
      this.props.loadPhoto(this.props.id)
    }
  }

  render() {
    const { photo, error, isProcessing } = this.props

    if (photo === undefined) return null

    return (
      <Fragment>
        {error && <Flash {...error} />}
        <Heading1>Edit photo</Heading1>
        <Form
          onSubmit={this.props.editPhoto.bind(this, photo.id)}
          photo={photo}
          isProcessing={isProcessing}
        />
      </Fragment>
    )
  }
}

Edit.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  editPhoto: PropTypes.func.isRequired,
  loadPhoto: PropTypes.func.isRequired,
  photo: PropTypes.object,
  isProcessing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default Edit
