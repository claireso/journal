import React, { memo, useCallback, useRef, useState } from 'react'

import Input from '@components/form/Input'
import Select from '@components/form/Select'
import Uploader from '@components/form/Uploader'
import ColorPicker from '@components/form/ColorPicker'
import { Group } from '@components/form/Group'
import Label from '@components/form/Label'
import SubmitButton from '@components/form/Buttons'

import { EnhancedPhoto } from '@models'
import useColorsExtractor from '@hooks/useColorsExtractor'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']

interface FormProps {
  photo?: EnhancedPhoto
  isProcessing?: boolean
  onSubmit: (data: FormData) => void
}

const Form = (props: FormProps) => {
  const { photo, isProcessing = false, onSubmit } = props

  const [colors, extractColors] = useColorsExtractor(photo?.source)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null | undefined>(photo?.color)

  const formEl = useRef(null!)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isProcessing) return

      onSubmit && onSubmit(new FormData(formEl.current))
    },
    [isProcessing, onSubmit, formEl]
  )

  const handleOnChangePhoto = (preview: string) => {
    extractColors(preview)
    setBackgroundPreview(null)
  }

  return (
    <form ref={formEl} method="POST" action="" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Input testId="title" name="title" label="Title" value={photo?.title || ''} />

      <Input testId="description" name="description" label="Description" value={photo?.description || ''} />

      <Group>
        <Label htmlFor="file">Photo</Label>

        <Uploader
          name="file"
          required={!photo ? true : undefined}
          accept={ALLOWED_MIMETYPES}
          preview={photo?.source}
          onChange={photo && handleOnChangePhoto}
          backgroundPreview={backgroundPreview}
        />
      </Group>

      {photo && colors?.length > 0 && (
        <Group>
          <Label>Background color</Label>
          <ColorPicker colors={colors} onSelect={setBackgroundPreview} selected={backgroundPreview} />
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
