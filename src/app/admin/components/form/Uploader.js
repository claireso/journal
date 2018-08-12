import React from 'react'
import PropTypes from 'prop-types'

import { IconUpload } from '../Icons'

const createThumbnail = file =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(file)
  })

class Uploader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      preview: props.preview
    }
  }

  handleChange = async event => {
    const { accept } = this.props

    const files = event.target.files

    if (files.length === 0) return

    const file = files[0]

    if (!file) return

    if (!accept.includes(file.type)) {
      this.setState({
        preview: null,
        error: 'This file is not allowed'
      })
      this.input.value = ''
      return
    }

    try {
      const thumbnail = await createThumbnail(file)

      this.setState({ preview: thumbnail, error: null })
    } catch (err) {
      /* eslint-disable */
      console.error(err)
    }
  }

  render() {
    const { preview, error } = this.state

    return (
      <div className="uploader">
        {preview && (
          <div className="uploader__preview">
            <img src={preview} />
          </div>
        )}
        <div className="uploader__content">
          <IconUpload />
          <span>Upload new photo</span>
          <small>(only jpg and png)</small>
          <input
            ref={c => (this.input = c)}
            className="uploader__input"
            type="file"
            name={this.props.name}
            onChange={this.handleChange}
            required={this.props.required}
          />
        </div>
        {error && <div className="uploader__error">{error}</div>}
      </div>
    )
  }
}

Uploader.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.string,
  accept: PropTypes.array,
  required: PropTypes.bool
}

export default Uploader
