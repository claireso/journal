import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/form/Input'
import Select from '../../../components/form/Select'
import Checkbox from '../../../components/form/Checkbox'
import Uploader from '../../../components/form/Uploader'
import { ALLOWED_MIMETYPES } from '../../../../../common/constants'

class Form extends React.Component {
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
        className="form"
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

        <div className="form__item">
          <label className="form__label" htmlFor="file">
            Photo
          </label>

          <Uploader
            name="file"
            required={!photo ? 'required' : undefined}
            accept={ALLOWED_MIMETYPES}
            preview={photo && `/img/${photo.name}`}
          />
        </div>

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

        <input
          className="form__submit btn"
          type="submit"
          value={photo ? 'Save' : 'Create'}
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
  onSubmit: PropTypes.func
}

export default Form
