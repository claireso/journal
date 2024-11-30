import React from 'react'
import { getPaginatedPhotos } from '@application/usecases'
import TablePager from '@web/components/TablePager'
import Photo from './Photo'

import * as cls from './styles.css'

interface AdminListPhotos {
  page: string
}

const PHOTOS_BY_LINE = 6

const fetchPhotos = async ({ page }: { page: string }) => {
  try {
    return await getPaginatedPhotos({ page, limit: '24' })
  } catch (err) {
    throw err
  }
}

const AdminListPhotos = async ({ page }: AdminListPhotos) => {
  const { pager, items: photos } = await fetchPhotos({ page })

  const count = photos.length
  const modulo = count % PHOTOS_BY_LINE
  const countGhostItems = modulo > 0 ? PHOTOS_BY_LINE - (count % PHOTOS_BY_LINE) : 0

  return (
    <>
      <TablePager align="right" {...pager} />
      <ul className={cls.list}>
        {photos.map((photo) => (
          <li key={photo.id} className={cls.listItem}>
            <Photo {...photo} />
          </li>
        ))}
        {Array.from(Array(countGhostItems)).map((_, index) => (
          <li key={`ghost-${index}`} className={cls.listItem} />
        ))}
      </ul>
    </>
  )
}

export default AdminListPhotos
