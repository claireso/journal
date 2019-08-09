import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Loader from '@common/components/Loader'
import { IconPlus } from '@common/components/Icons'

import Pager from '@admin/components/Pager'
import Toolbar from '@admin/components/Toolbar'
import List from '@admin/components/List'
import { PrimaryButton } from '@admin/components/Buttons'

import withModalEdition from '@admin/hoc/withModalEdition'

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
      <Toolbar>
        <PrimaryButton
          onClick={ev => {
            ev.preventDefault()
            navigate({ action: ACTION_TYPES.CREATE_PHOTO })
          }}
        >
          Add a new photo
          <IconPlus />
        </PrimaryButton>
      </Toolbar>

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

          {props.getModal()}
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
  getModal: PropTypes.func.isRequired
}

export default withModalEdition(Photos, {
  loadData: (params, props) => {
    props.loadPhotos(params)
  },
  getModalChildComponent: (id, action, props) => {
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
})
