import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = (props = {}) => {
  return (
    <div className="form__item form__item--inline">
      <label
        className="form__label"
        htmlFor={ props.name }
      >
        { props.label }
      </label>
      <input
        id={ props.name }
        type="checkbox"
        name={ props.name }
        defaultChecked={ props.value }
      />
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
}

export default Checkbox
