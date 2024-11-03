'use client'

import React, { memo, useCallback, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'

import logger from '@infrastructure/logger'
import type { PhotoDto, PhotoInsertDto, PhotoUpdateDto } from '@dto'

import Flash from '@web/components/Flash'
import Input from '@web/components/form/Input'
import Select from '@web/components/form/Select'
import Uploader from '@web/components/form/Uploader'
import ColorPicker from '@web/components/form/ColorPicker'
import Group from '@web/components/form/Group'
import Label from '@web/components/form/Label'
import ButtonSubmit from '@web/components/form/ButtonSubmit'

import useColorsExtractor from '@web/hooks/useColorsExtractor'
import { useCreateMedia } from '@web/features/media/useMedia'
import useMessages, { Message } from '@web/features/messages/useMessages'

import * as cls from './styles.css'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/jpg']

enum Status {
  IDLE = 'idle',
  SUCCESS = 'success',
  ERROR = 'error'
}

type FormState<T> = { status: Status.IDLE } | { status: Status.SUCCESS; item: T } | { status: Status.ERROR }

interface FormProps<T> {
  photo?: PhotoDto
  successMessage: Omit<Message, 'status'>
  errorMessage: Omit<Message, 'status'>
  action: (prevState: FormState<T>, data: FormData) => Promise<FormState<T>>
}

const initialState: FormState<undefined> = {
  status: Status.IDLE
}

const Form = <T extends PhotoInsertDto | PhotoUpdateDto>({
  photo,
  action,
  successMessage,
  errorMessage
}: FormProps<T>) => {
  const [state, formAction] = useFormState(action, initialState)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [previewBackground, setPreviewBackground] = useState<string | null | undefined>(photo?.color)
  const [, { displayErrorMessage, displaySuccessMessage }] = useMessages()
  const [{ media, processing: mediaProcessing, error: mediaError }, createMedia] = useCreateMedia(photo?.media)
  const [colors] = useColorsExtractor(media?.source)

  useEffect(() => {
    if (state.status !== Status.IDLE) {
      if (state.status === Status.SUCCESS) {
        displaySuccessMessage(successMessage)
      }
      if (state.status === Status.ERROR) {
        displayErrorMessage(errorMessage)
      }
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete('action')
      newSearchParams.delete('id')
      // redirect to the first page after photo creation
      if (!photo) {
        newSearchParams.delete('page')
      }
      router.push(`?${newSearchParams.toString()}`)
      // NOTE: use refresh to make a new request to the server, re-fetching data requests, and re-rendering Server Components
      router.refresh()
    }
  }, [state.status, router, searchParams, photo])

  const onChangeMedia = useCallback(
    async (file: File) => {
      setPreviewBackground(null)
      await createMedia(file)
    },
    [createMedia]
  )

  return (
    <form action={formAction}>
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
          processing={mediaProcessing}
          onChangeMedia={onChangeMedia}
          onError={logger.error}
        />
      </Group>

      {colors?.length > 0 && (
        <Group>
          <Label>Background color</Label>
          <ColorPicker
            disabled={mediaProcessing}
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

      {/* hidden fields: photo id and photo media id */}
      {!!photo?.id && <input type="hidden" name="id" value={photo.id} />}
      {!!(media && 'id' in media) && <input type="hidden" name="media_id" value={media.id} />}

      <div className={cls.submit}>
        <ButtonSubmit size="lg" variant="primary" disabled={mediaProcessing || !!mediaError}>
          {photo ? 'Save' : 'Create'}
        </ButtonSubmit>
      </div>
    </form>
  )
}

// Explicit typing of `memo` to accept generic types
export default memo(Form) as typeof Form
