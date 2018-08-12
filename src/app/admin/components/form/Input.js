import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
  handleChange = event => {
    const { onChange } = this.props

    onChange(this.props.name, event.target.value)
  }

  render() {
    return (
      <div className="form__item">
        <label className="form__label" htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <input
          id={this.props.name}
          className="form__input"
          type={this.props.type || 'text'}
          name={this.props.name}
          defaultValue={this.props.value}
          required={this.props.required}
          onChange={this.props.onChange && this.handleChange}
        />
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
}

export default Input
