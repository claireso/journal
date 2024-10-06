import type { PhotosDto } from '@dto'
import Photo from './Photo'
import Pager from './Pager'

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
      <Pager pager={pager} />
    </>
  )
}

export default ListPhotos
