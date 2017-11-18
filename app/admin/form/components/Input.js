import React from 'react'
import PropTypes from 'prop-types'

const Input = (props = {}) => {
  return (
    <div className="form__item">
      <label className="form__label" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        id={props.name}
        className="form__input"
        type="text"
        name={props.name}
        defaultValue={props.value}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default Input
