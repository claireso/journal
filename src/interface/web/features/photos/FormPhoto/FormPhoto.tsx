import React, { memo, useCallback, useRef, useState } from 'react'

import logger from '@infrastructure/logger'
import type { PhotoDto, PhotoInsertDto, PhotoUpdateDto } from '@dto'

import Input from '@web/components/form/Input'
import Select from '@web/components/form/Select'
import Uploader from '@web/components/form/Uploader'
import ColorPicker from '@web/components/form/ColorPicker'
import Group from '@web/components/form/Group'
import Label from '@web/components/form/Label'
import Flash from '@web/components/Flash'
import { ButtonPrimary } from '@web/components/Buttons'

import useColorsExtractor from '@web/hooks/useColorsExtractor'
import { useCreateMedia } from '@web/features/media/useMedia'

import * as cls from './styles.css'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/jpg']

interface FormProps<T> {
  photo?: PhotoDto
  isProcessing?: boolean
  onSubmit: (data: T) => void
}

const Form = <T extends PhotoInsertDto | PhotoUpdateDto>(props: FormProps<T>) => {
  const { photo, isProcessing = false, onSubmit } = props
  const { mutate: createMedia, isPending: isCreatingMedia } = useCreateMedia()
  const [media, setMedia] = useState(photo?.media)
  const [mediaError, setMediaError] = useState<string | null>(null)

  const [colors] = useColorsExtractor(media?.source)
  const [previewBackground, setPreviewBackground] = useState<string | null | undefined>(photo?.color)

  const formEl = useRef(null!)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isProcessing || isCreatingMedia || mediaError) return

      const formData = new FormData(formEl.current)
      formData.delete('file')

      const data = Object.fromEntries(formData) as unknown as T

      if (media && 'id' in media) {
        data.media_id = media.id
      }

      onSubmit && onSubmit(data)
    },
    [isProcessing, isCreatingMedia, mediaError, onSubmit, formEl, media]
  )

  const onChangeMedia = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    setMediaError(null)
    setPreviewBackground(null)

    createMedia(formData, {
      onSuccess(media) {
        setMedia(media)
        setPreviewBackground(null)
      },
      onError(err) {
        setMediaError('An error has occured during the upload. Please retry')
        logger.error(err)
      }
    })
  }

  return (
    <form ref={formEl} method="POST" action="" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Input name="title" label="Title" value={photo?.title || ''} />

      <Input name="description" label="Description" value={photo?.description || ''} />

      <Group>
        <Label htmlFor="file">Photo</Label>
        {mediaError && <Flash status="error">{mediaError}</Flash>}
        <Uploader
          name="file"
          required={!!!photo}
          accept={ALLOWED_MIMETYPES}
          preview={media?.source}
          previewBackgroundColor={previewBackground}
          processing={isCreatingMedia}
          onChangeMedia={onChangeMedia}
          onError={logger.error}
        />
      </Group>

      {colors?.length > 0 && (
        <Group>
          <Label>Background color</Label>
          <ColorPicker
            disabled={isCreatingMedia}
            colors={colors}
            onSelect={setPreviewBackground}
            selected={previewBackground}
          />
        </Group>
      )}

      <Select
        label="Position"
        name="position"
        value={photo?.position || 'left'}
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

      <div className={cls.submit}>
        <ButtonPrimary type="submit" loading={isProcessing} size="lg">
          {photo ? 'Save' : 'Create'}
        </ButtonPrimary>
      </div>
    </form>
  )
}

// Explicit typing of `memo` to accept generic types
export default memo(Form) as typeof Form
