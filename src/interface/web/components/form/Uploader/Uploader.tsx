import React, { useState, useRef, useCallback } from 'react'

import { create as createThumbnail } from '@web/services/thumbnails'

import Spinner from '@web/components/Spinner'
import Text from '@web/components/Text'
import Icon from '@web/components/Icons'
import Flash from '@web/components/Flash'

import { tokens } from '@web/theme/core/tokens.css'
import * as cls from './styles.css'

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
    <div className={cls.wrapper}>
      {currentPreview && (
        <div
          className={cls.preview({ processing })}
          style={{
            background: previewBackgroundColor || tokens.colors.neutral['2extralight']
          }}
        >
          <img className={cls.previewImage} src={currentPreview} alt="" />
        </div>
      )}
      <div>
        <div className={cls.content}>
          {processing ? <Spinner variant="primary" /> : <Icon name="upload" size="lg" variant="primary" />}
          <Text as="span">Upload new photo</Text>
          <Text as="span" size="sm" color="neutral">
            (only {accept.join(', ')})
          </Text>
        </div>

        <input
          className={cls.input}
          ref={refInput}
          type="file"
          name={name}
          onChange={onChange}
          required={required}
          accept={accept.join(',')}
        />
      </div>
      {error && <Flash status="error">{error}</Flash>}
    </div>
  )
}

export default Uploader
