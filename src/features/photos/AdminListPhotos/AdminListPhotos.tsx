import React from 'react'

import { EnhancedPhoto } from '@models'
import { List } from '@components/List'
import Photo from './Photo'

interface AdminListPhotos {
  photos?: EnhancedPhoto[]
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const AdminListPhotos = ({ photos = [], onDelete, onEdit }: AdminListPhotos) => {
  return (
    <List>
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </List>
  )
}

export default React.memo(AdminListPhotos)
