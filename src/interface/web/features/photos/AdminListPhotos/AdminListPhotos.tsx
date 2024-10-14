import React from 'react'

import { PhotosDto } from '@dto'
import Photo from './Photo'

import * as cls from './styles.css'

interface AdminListPhotos {
  photos?: PhotosDto['items']
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const PHOTOS_BY_LINE = 4

const AdminListPhotos = ({ photos = [], onDelete, onEdit }: AdminListPhotos) => {
  const count = photos.length
  const modulo = count % PHOTOS_BY_LINE
  const countGhostItems = modulo > 0 ? PHOTOS_BY_LINE - (count % PHOTOS_BY_LINE) : 0
  return (
    <ul className={cls.list}>
      {photos.map((photo) => (
        <li key={photo.id} className={cls.listItem}>
          <Photo {...photo} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
      {Array.from(Array(countGhostItems)).map((_, index) => (
        <li key={`ghost-${index}`} className={cls.listItem} />
      ))}
    </ul>
  )
}

export default React.memo(AdminListPhotos)
