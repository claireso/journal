import React from 'react'

import { PhotosDto } from '@dto'
import { List } from '@web/components/List'
import Photo from './Photo'

interface AdminListPhotos {
  photos?: PhotosDto['items']
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
