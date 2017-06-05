import React from 'react'

export default (props = '') => {
  return (
    <div className="form__item">
      <label 
        className="form__label"
        htmlFor={ props.name }
      >
        { props.label }
      </label>
      <input 
        id={ props.name }
        className="form__input" 
        type="text" 
        name={ props.name }
        defaultValue={ props.value } 
      />
    </div>
  )
}