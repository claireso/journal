import React from 'react'
import PropTypes from 'prop-types'

import { IconBack } from './Icons'

export const ButtonLink = (props = {}) => {
  return (
    <a className="btn btn--icon" href={props.href}>
      {props.label}
      {props.icon}
    </a>
  )
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element
}

export const BackLink = (props = {}) => {
  return (
    <a className="link" href={props.href}>
      <IconBack />
      {props.label}
    </a>
  )
}

BackLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
