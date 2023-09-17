import Photo from './Photo'
import Pager from './Pager'

interface ListPhotosProps {
  photos: Photo[]
  pager: {
    count?: number
    first?: number
    prev?: number
    next?: number
    last?: number
  }
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
