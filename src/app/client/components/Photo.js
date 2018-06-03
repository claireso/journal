import React from 'react'
import PropTypes from 'prop-types'

const Photo = (props = {}) => {
  const cls = 'figure-' + props.position
  const width = props.portrait ? 385 : props.square ? 578 : 810
  const height = props.portrait || props.square ? 578 : 540

  return (
    <figure className={cls}>
      <div>
        <img src={`/img/${props.name}`} width={width} height={height} alt="" />
        <figcaption>
          {props.title}

          {props.description && <span> {props.description} </span>}
        </figcaption>
      </div>
    </figure>
  )
}

Photo.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  portrait: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  square: PropTypes.bool.isRequired,
  title: PropTypes.string
}

export default Photo
