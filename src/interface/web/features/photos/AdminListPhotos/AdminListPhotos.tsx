import React from 'react'

import { Photo as IPhoto } from '@domain/entities'
import { List } from '@web/components/List'
import Photo from './Photo'

interface AdminListPhotos {
  photos?: IPhoto[]
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
