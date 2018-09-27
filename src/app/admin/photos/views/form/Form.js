import React from 'react'
import PropTypes from 'prop-types'

import Input from '@admin/components/form/Input'
import Select from '@admin/components/form/Select'
import Checkbox from '@admin/components/form/Checkbox'
import Uploader from '@admin/components/form/Uploader'
import { Group } from '@admin/components/form/components/Group'
import Label from '@admin/components/form/components/Label'
import SubmitButton from '@admin/components/form/components/Button'
import { ALLOWED_MIMETYPES } from '@common/constants'

class Form extends React.PureComponent {
  handleSubmit = event => {
    event.preventDefault()

    const { onSubmit } = this.props

    onSubmit && onSubmit(new FormData(this.form))
  }

  render() {
    const { photo } = this.props

    return (
      <form
        ref={c => (this.form = c)}
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
            preview={photo && `/img/${photo.name}`}
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

        <Checkbox
          name="portrait"
          label="Portrait"
          value={photo ? photo.portrait : false}
        />

        <Checkbox
          name="square"
          label="Square"
          value={photo ? photo.square : false}
        />

        <SubmitButton value={photo ? 'Save' : 'Create'} />
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
  onSubmit: PropTypes.func
}

export default Form
