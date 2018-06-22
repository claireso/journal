import React from 'react'
import PropTypes from 'prop-types'

import { ButtonLink } from '../../components/Links'

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
          <ButtonLink href={`/admin/photos/${photo.id}/edit`} label="Edit" />
          <ButtonLink
            href={`/admin/photos/${photo.id}/delete`}
            label="Delete"
            className="js-delete"
          />
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
