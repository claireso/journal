import React, { memo, useCallback, useRef, useState } from 'react'

import logger from '@infrastructure/logger'
import { Photo } from '@domain/entities'

import Input from '@web/components/form/Input'
import Select from '@web/components/form/Select'
import Uploader from '@web/components/form/Uploader'
import ColorPicker from '@web/components/form/ColorPicker'
import { Group } from '@web/components/form/Group'
import Label from '@web/components/form/Label'
import SubmitButton from '@web/components/form/Buttons'
import Flash from '@web/components/Flash'

import useColorsExtractor from '@web/hooks/useColorsExtractor'
import { useCreateMedia } from '@web/features/media/useMedia'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/jpg']

interface FormProps {
  photo?: Photo
  isProcessing?: boolean
  onSubmit: (data: Partial<Photo>) => void
}

const Form = (props: FormProps) => {
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

      const data: Partial<Photo> = Object.fromEntries(formData)

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
      <Input testId="title" name="title" label="Title" value={photo?.title || ''} />

      <Input testId="description" name="description" label="Description" value={photo?.description || ''} />

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

      <SubmitButton value={photo ? 'Save' : 'Create'} isLoading={isProcessing} data-testid="submit" />
    </form>
  )
}

export default memo(Form)
