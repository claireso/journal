import React from 'react'
import PropTypes from 'prop-types'

import Input from '@components/admin/form/Input'
import Select from '@components/admin/form/Select'
import Uploader from '@components/admin/form/Uploader'
import { Group } from '@components/admin/form/Group'
import Label from '@components/admin/form/Label'
import SubmitButton from '@components/admin/form/Buttons'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']

class Form extends React.PureComponent {
  handleSubmit = (event) => {
    event.preventDefault()

    const { onSubmit, isProcessing } = this.props

    if (isProcessing) return

    onSubmit && onSubmit(new FormData(this.form))
  }

  render() {
    const { photo, isProcessing } = this.props

    return (
      <form
        ref={(c) => (this.form = c)}
        method="POST"
        action=""
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        <Input name="title" label="Title" value={photo ? photo.title : ''} />

        <Input
          name="description"
          label="Description"
          value={photo ? photo.description : ''}
        />

        <Group>
          <Label htmlFor="file">Photo</Label>

          <Uploader
            name="file"
            required={!photo ? true : undefined}
            accept={ALLOWED_MIMETYPES}
            preview={photo && `/uploads/${photo.name}`}
          />
        </Group>

        <Select
          label="Position"
          name="position"
          value={photo ? photo.position : ''}
          options={[
            {
              value: 'left',
              label: 'Left'
            },
            {
              value: 'center',
              label: 'Center'
            },
            {
              value: 'right',
              label: 'Right'
            }
          ]}
        />

        <SubmitButton
          value={photo ? 'Save' : 'Create'}
          isLoading={isProcessing}
        />
      </form>
    )
  }
}

Form.propTypes = {
  photo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    portrait: PropTypes.bool,
    square: PropTypes.bool
  }),
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool.isRequired
}

export default Form
