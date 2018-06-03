import React from 'react'
import PropTypes from 'prop-types'

const Photo = photo => {
  return (
    <li className="list__item">
      <div className="list__picture">
        <img src={`/img/${photo.name}`} />
      </div>
      <div className="list__text">
        <h2 className="title">{photo.title}</h2>
        <p className="subtitle">{photo.description}</p>
        <p className="list__buttons">
          <a className="btn" href={`/admin/photos/${photo.id}/edit`}>
            {' '}
            Edit{' '}
          </a>
          <a className="btn" href={`/admin/photos/${photo.id}/delete`}>
            {' '}
            Delete{' '}
          </a>
        </p>
      </div>
    </li>
  )
}

Photo.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Photo
