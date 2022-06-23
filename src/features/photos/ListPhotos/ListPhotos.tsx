import Photo from './Photo'

interface ListPhotosProps {
  photos: Photo[]
}

const ListPhotos = ({ photos = [] }: ListPhotosProps) => {
  return (
    <>
      {photos.map((photo, index) => (
        <Photo key={photo.id} {...photo} row={index + 1} />
      ))}
    </>
  )
}

export default ListPhotos
