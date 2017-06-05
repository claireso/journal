import React from 'react'

export default (props) => {
  return (
    <div className="form__item form__item--inline">
      <label 
        className="form__label"
        htmlFor={ props.name }
      >
        { props.label }
      </label>
      <select 
        id={ props.name } 
        name={ props.name } 
        defaultValue={ props.value }
        required 
      >
        { props.options.map((option, index) => {
          return (
            <option 
              key={ index }
              value={ option.value }
            >
              { option.label }
            </option>
          )
        }) }
      </select>
    </div>
  )
}