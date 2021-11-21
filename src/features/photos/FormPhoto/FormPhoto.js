import React, { memo, useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { PhotoTypes } from '@types'

import Input from '@components/form/Input'
import Select from '@components/form/Select'
import Uploader from '@components/form/Uploader'
import ColorPicker from '@components/form/ColorPicker'
import { Group } from '@components/form/Group'
import Label from '@components/form/Label'
import SubmitButton from '@components/form/Buttons'

import useColorsExtractor from '@hooks/useColorsExtractor'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']

const Form = (props) => {
  const { photo, isProcessing, onSubmit } = props

  const [colors, extractColors] = useColorsExtractor(photo?.source)

  const [backgroundPreview, setBackgroundPreview] = useState(photo?.color)

  const formEl = useRef(null)

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (isProcessing) return

      onSubmit && onSubmit(new FormData(formEl.current))
    },
    [isProcessing, onSubmit, formEl]
  )

  const handleOnChangePhoto = (preview) => {
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

      {photo && colors?.length && (
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

Form.propTypes = {
  photo: PropTypes.shape(PhotoTypes),
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool
}

Form.defaultProps = {
  photo: null,
  onSubmit: () => {},
  isProcessing: false
}

export default memo(Form)
