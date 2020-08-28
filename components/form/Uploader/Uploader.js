import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { create as createThumbnail } from '@services/thumbnails'
import { IconUpload } from '@components/Icons'

import * as S from './Uploader.styles'

const Uploader = (props) => {
  const [{ preview, error }, setState] = useState({ preview: props.preview })
  const input = useRef()

  const handleChange = async (event) => {
    const { accept, onChange } = props

    const files = event.target.files

    if (files.length === 0) return

    const file = files[0]

    if (!file) return

    if (!accept.includes(file.type)) {
      setState({
        preview: null,
        error: 'This file is not allowed'
      })
      input.current.value = ''
      return
    }

    try {
      const thumbnail = await createThumbnail(file)

      setState({ preview: thumbnail, error: null })

      onChange && onChange(thumbnail)
    } catch (err) {
      /* eslint-disable */
      console.error(err)
    }
  }

  return (
    <S.UploaderWrapper>
      {preview && (
        <S.UploaderPreview backgroundColor={props.backgroundPreview}>
          <img src={preview} />
        </S.UploaderPreview>
      )}
      <S.UploaderContent>
        <IconUpload />
        <span>Upload new photo</span>
        <small>(only jpg and png)</small>
        <S.UploaderInput
          ref={input}
          type="file"
          name={props.name}
          onChange={handleChange}
          required={props.required}
        />
      </S.UploaderContent>
      {error && <S.UploaderError>{error}</S.UploaderError>}
    </S.UploaderWrapper>
  )
}

Uploader.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.array.isRequired,
  preview: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
}

export default Uploader
