import { Fragment, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import PhotosReducer, { ACTION_TYPES } from '../reducer'

import Loader from '@components/Loader'
import { IconPlus } from '@components/Icons'
import { List, ListHeader } from '@components/List'
import { PrimaryButton } from '@components/Buttons'
import { Heading1 } from '@components/Headings'
import Pager from '@components/Pager'

import Photo from './components/Photo'

const Photos = () => {
  const [
    { items: photos, pager, ...state },
    { loadResources }
  ] = PhotosReducer.usePhotosReducer()
  const isLoading = ['idle', 'loading'].includes(state.status)

  const router = useRouter()
  const { query, pathname } = router

  useEffect(() => {
    loadResources(query.page)
  }, [query.page, loadResources])

  const navigate = useCallback(
    (params) => {
      router.push({ pathname: pathname, query: { ...query, ...params } })
    },
    [pathname, query, router]
  )

  const onPageChange = (page) => navigate({ page })

  const onCreate = useCallback(
    (ev) => {
      ev.preventDefault()
      navigate({ action: ACTION_TYPES.CREATE })
    },
    [navigate]
  )

  const onDelete = useCallback(
    (id, event) => {
      event.preventDefault()
      navigate({
        action: ACTION_TYPES.DELETE,
        id: id
      })
    },
    [navigate]
  )

  const onEdit = useCallback(
    (id, event) => {
      event.preventDefault()
      navigate({
        action: ACTION_TYPES.EDIT,
        id: id
      })
    },
    [navigate]
  )

  return (
    <Fragment>
      <ListHeader>
        <Heading1>Your photos {pager && <span>({pager.count})</span>}</Heading1>
        <PrimaryButton onClick={onCreate}>
          Add a new photo
          <IconPlus />
        </PrimaryButton>
      </ListHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <List>
            {photos.map((photo, index) => (
              <Photo
                key={index}
                {...photo}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </List>
          <Pager {...pager} navigate={onPageChange} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Photos
