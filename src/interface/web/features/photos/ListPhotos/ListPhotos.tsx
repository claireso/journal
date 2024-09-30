import { Photos } from '@models'
import Photo from './Photo'
import Pager from './Pager'

interface ListPhotosProps {
  photos: Photos['items']
  pager: Photos['pager']
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
