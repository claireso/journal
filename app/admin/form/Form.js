import React from 'react'

import Input from './components/Input'
import Select from './components/Select'
import Checkbox from './components/Checkbox'

export default ({ photo } = {}) => {
  return (
    <form className="form" method="POST" action="" encType="multipart/form-data">
      <Input 
        name="title"
        label="Title"
        value={ photo ? photo.title : '' }
      />

      <Input 
        name="description"
        label="Description"
        value={ photo ? photo.description : '' }
      />

      <div className="form__item">
        <label 
          className="form__label"
          htmlFor="file"
        > 
          Photo 
        </label>
    
        <div className={ photo ? 'form__photo' : ''}>
          { photo &&
            <img src={ `/img/${ photo.name }` } width="300" />
          }
          <input 
            id="file" 
            type="file" 
            name="file" 
            required={ !photo ? 'required' : undefined } 
          />
        </div>
      </div>

      <Select
        label="Position"
        name="position"
        value={ photo ? photo.position : '' }
        options={[
          {
            value: 'left',
            label: 'Left',
          },
          {
            value: 'center',
            label: 'Center',
          },
          {
            value: 'right',
            label: 'Right'
          }
        ]}
      />

      <Checkbox 
        name="portrait"
        label="Portrait"
        value={ photo ? photo.portrait : false }
      />

      <Checkbox 
        name="square"
        label="Square"
        value={ photo ? photo.square : false }
      />

      <input 
        className="form__submit btn"
        type="submit" 
        value="Submit"
      />

    </form>
  )
}