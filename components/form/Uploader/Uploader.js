import React from 'react'
import PropTypes from 'prop-types'

import { create as createThumbnail } from '@services/thumbnails'
import { IconUpload } from '@components/Icons'

import * as S from './Uploader.styles'

class Uploader extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      preview: props.preview
    }
  }

  handleChange = async (event) => {
    const { accept, onChange } = this.props

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

      onChange && onChange(thumbnail)
    } catch (err) {
      /* eslint-disable */
      console.error(err)
    }
  }

  render() {
    const { preview, error } = this.state

    return (
      <S.UploaderWrapper>
        {preview && (
          <S.UploaderPreview backgroundColor={this.props.backgroundPreview}>
            <img src={preview} />
          </S.UploaderPreview>
        )}
        <S.UploaderContent>
          <IconUpload />
          <span>Upload new photo</span>
          <small>(only jpg and png)</small>
          <S.UploaderInput
            ref={(c) => (this.input = c)}
            type="file"
            name={this.props.name}
            onChange={this.handleChange}
            required={this.props.required}
          />
        </S.UploaderContent>
        {error && <S.UploaderError>{error}</S.UploaderError>}
      </S.UploaderWrapper>
    )
  }
}

Uploader.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.string,
  accept: PropTypes.array,
  required: PropTypes.bool,
  onChange: PropTypes.func
}

export default Uploader
