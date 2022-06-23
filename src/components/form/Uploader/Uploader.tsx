import React, { useState, useRef } from 'react'

import { create as createThumbnail } from '@services/thumbnails'
import { IconUpload } from '@components/Icons'

import * as S from './Uploader.styles'

interface UploaderProps {
  name: string
  accept: string[]
  preview?: string
  required?: boolean
  onChange?: (thumbnail: string) => void
  backgroundPreview?: string | null
}

interface State {
  preview?: string | null
  error?: string | null
}

const Uploader = (props: UploaderProps) => {
  const [{ preview, error }, setState] = useState<State>({ preview: props.preview })
  const input = useRef<HTMLInputElement>(null)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { accept, onChange } = props

    const files = event.target.files

    if (!files || files.length === 0) return

    const file = files[0]

    if (!file) return

    if (!accept.includes(file.type)) {
      setState({
        preview: null,
        error: 'This file is not allowed'
      })
      if (input.current) {
        input.current.value = ''
      }
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
        <S.UploaderPreview
          css={{
            background: props.backgroundPreview || '$secondary200'
          }}
        >
          <img src={preview} />
        </S.UploaderPreview>
      )}
      <S.UploaderContent>
        <IconUpload />
        <span>Upload new photo</span>
        <small>(only jpg and png)</small>
        <S.UploaderInput ref={input} type="file" name={props.name} onChange={handleChange} required={props.required} />
      </S.UploaderContent>
      {error && <S.UploaderError>{error}</S.UploaderError>}
    </S.UploaderWrapper>
  )
}

export default Uploader
