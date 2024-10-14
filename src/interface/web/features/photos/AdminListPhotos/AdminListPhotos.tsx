import React from 'react'

import { PhotosDto } from '@dto'
import Photo from './Photo'

import * as cls from './styles.css'

interface AdminListPhotos {
  photos?: PhotosDto['items']
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const AdminListPhotos = ({ photos = [], onDelete, onEdit }: AdminListPhotos) => {
  return (
    <ul className={cls.list}>
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  )
}

export default React.memo(AdminListPhotos)
