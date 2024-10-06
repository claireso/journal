import React, { useState, useRef, useCallback } from 'react'

import { create as createThumbnail } from '@web/services/thumbnails'

import { IconUpload } from '@web/components/Icons'
import Spinner from '@web/components/Spinner'

import * as S from './Uploader.styles'

interface UploaderProps {
  name: string
  accept: string[]
  processing: boolean
  preview?: string
  required?: boolean
  previewBackgroundColor?: string | null
  onError: (err: unknown) => void
  onChangeMedia: (file: File) => void
}

const Uploader = ({
  name,
  accept,
  processing,
  onChangeMedia,
  preview,
  required,
  previewBackgroundColor,
  onError
}: UploaderProps) => {
  const [currentPreview, setCurrentPreview] = useState<string | null>(preview ?? null)
  const [error, setError] = useState<string | null>(null)
  const refInput = useRef<HTMLInputElement>(null)

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      if (!accept.includes(file.type)) {
        setCurrentPreview(null)
        setError('This file type is not allowed')
        if (refInput.current) {
          refInput.current.value = ''
        }
        return
      }

      setError(null)

      try {
        const thumbnail = await createThumbnail(file)
        setCurrentPreview(thumbnail)
        onChangeMedia(file)
      } catch (err) {
        onError(err)
      }
    },
    [accept, onError, onChangeMedia]
  )

  return (
    <S.UploaderWrapper>
      {currentPreview && (
        <S.UploaderPreview
          css={{
            background: previewBackgroundColor || '$secondary200',
            opacity: processing ? 0.5 : 1
          }}
          data-testid="preview"
        >
          <img src={currentPreview} alt="" />
        </S.UploaderPreview>
      )}
      <S.UploaderContent>
        <>
          <S.UploaderIcon>{processing ? <Spinner /> : <IconUpload />}</S.UploaderIcon>
          <span>Upload new photo</span>
          <small>(only {accept.join(', ')})</small>
        </>

        <S.UploaderInput
          ref={refInput}
          type="file"
          name={name}
          onChange={onChange}
          required={required}
          accept={accept.join(',')}
        />
      </S.UploaderContent>
      {error && <S.UploaderError>{error}</S.UploaderError>}
    </S.UploaderWrapper>
  )
}

export default Uploader
