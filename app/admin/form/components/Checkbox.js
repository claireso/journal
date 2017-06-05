import React from 'react'

export default (props = {}) => {
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
