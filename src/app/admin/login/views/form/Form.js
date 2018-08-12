import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/form/Input'

class Form extends React.Component {
  state = {}

  handleSubmit = event => {
    event && event.preventDefault()

    const { onSubmit } = this.props

    onSubmit && onSubmit(this.state)
  }

  handleChange = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
        ref={c => (this.form = c)}
      >
        <Input
          name="username"
          label="Username"
          required
          onChange={this.handleChange}
          value={this.state.username}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          required
          onChange={this.handleChange}
          value={this.state.password}
        />
        <input className="form__submit btn" type="submit" value="Log in" />
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func
}

export default Form
