import type { PhotosDto } from '@dto'
import Pager from '@web/features/pagination/Pager'
import Photo from './Photo'
import * as cls from './styles.css'

interface ListPhotosProps {
  photos: PhotosDto['items']
  pager: PhotosDto['pager']
}

const ListPhotos = ({ photos = [], pager }: ListPhotosProps) => {
  return (
    <>
      {photos.map((photo, index) => (
        <Photo key={photo.id} {...photo} row={index + 1} />
      ))}
      <div className={cls.listPhotosPager}>
        <Pager pager={pager} />
      </div>
    </>
  )
}

export default ListPhotos
