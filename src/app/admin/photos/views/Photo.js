import React from 'react'
import PropTypes from 'prop-types'

import { ButtonLink } from '../../components/Links'

const Photo = props => {
  return (
    <li className="list__item">
      <div className="list__picture">
        <img src={`/img/${props.name}`} />
      </div>
      <div className="list__text">
        <h2 className="title">{props.title}</h2>
        <p className="subtitle">{props.description}</p>
        <p className="list__buttons">
          <ButtonLink
            href="#"
            label="Edit"
            onClick={props.onEdit.bind(this, props.id)}
          />
          <ButtonLink
            href="#"
            label="Delete"
            onClick={props.onDelete.bind(this, props.id)}
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
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Photo
