import React from 'react'
import PropTypes from 'prop-types'

import { PhotoTypes } from '@types'

import { List } from '@components/List'
import Photo from './Photo'

const AdminListPhotos = ({ photos, onDelete, onEdit }) => {
  return (
    <List>
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </List>
  )
}

AdminListPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape(PhotoTypes)),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
}

AdminListPhotos.defaultProps = {
  photos: [],
  onDelete: () => {},
  onEdit: () => {}
}

export default React.memo(AdminListPhotos)
