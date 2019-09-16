import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Loader from '@common/components/Loader'
import { IconPlus } from '@common/components/Icons'

import Pager from '@admin/components/Pager'
import { List, ListHeader } from '@admin/components/List'
import { PrimaryButton } from '@admin/components/Buttons'
import { Heading1 } from '@admin/components/Headings'

import withModalEdition from '@admin/hoc/withModalEdition'
import withNavigate from '@admin/hoc/withNavigate'
import withList from '@admin/hoc/withList'

import CreatePhoto from '../containers/Create'
import EditPhoto from '../containers/Edit'
import DeletePhoto from '../containers/Delete'
import Photo from './Photo'

const ACTION_TYPES = {
  CREATE_PHOTO: 'create_photo',
  EDIT_PHOTO: 'edit_photo',
  DELETE_PHOTO: 'delete_photo'
}

const Photos = props => {
  const { photos, navigate } = props

  const onDelete = useCallback(
    (id, event) => {
      event.preventDefault()
      navigate({
        action: ACTION_TYPES.DELETE_PHOTO,
        id: id
      })
    },
    [navigate]
  )

  const onEdit = useCallback(
    (id, event) => {
      event.preventDefault()
      navigate({
        action: ACTION_TYPES.EDIT_PHOTO,
        id: id
      })
    },
    [navigate]
  )

  return (
    <React.Fragment>
      <ListHeader>
        <Heading1>
          Your photographies{' '}
          {photos.pager && <span>({photos.pager.count})</span>}
        </Heading1>
        <PrimaryButton
          onClick={ev => {
            ev.preventDefault()
            navigate({ action: ACTION_TYPES.CREATE_PHOTO })
          }}
        >
          Add a new photo
          <IconPlus />
        </PrimaryButton>
      </ListHeader>

      {photos.isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <List>
            {photos.items.map((photo, index) => (
              <Photo
                key={index}
                {...photo}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </List>

          <Pager {...photos.pager} navigate={navigate} />

          {props.modal}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

Photos.propTypes = {
  navigate: PropTypes.func.isRequired,
  photos: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    pager: PropTypes.object,
    detail: PropTypes.object
  }).isRequired,
  loadPhotos: PropTypes.func.isRequired,
  modal: PropTypes.node
}

const loadData = (params, props) => props.loadPhotos(params)

const getModalChildComponent = (id, action, props) => {
  let component

  switch (action) {
    case ACTION_TYPES.CREATE_PHOTO: {
      component = <CreatePhoto />
      break
    }
    case ACTION_TYPES.DELETE_PHOTO: {
      if (!id) return null
      component = <DeletePhoto id={id} />
      break
    }
    case ACTION_TYPES.EDIT_PHOTO: {
      if (!id) return null

      let photo = props.photos.items.find(p => p.id === id)

      if (!photo) photo = props.photos.detail

      component = <EditPhoto photo={photo} id={id} />
      break
    }
  }

  return component
}

export default withNavigate(
  withModalEdition(withList(Photos, loadData), getModalChildComponent)
)
