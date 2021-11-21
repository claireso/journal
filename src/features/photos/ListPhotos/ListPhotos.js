import Photo from './Photo'
import PropTypes from 'prop-types'

import { PhotoTypes } from '@types'

const ListPhotos = ({ photos }) => {
  return photos.map((photo, index) => <Photo key={photo.id} {...photo} row={index + 1} />)
}

ListPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape(PhotoTypes))
}

ListPhotos.defaultProps = {
  photos: []
}

export default ListPhotos
