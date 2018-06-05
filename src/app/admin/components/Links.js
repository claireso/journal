import React from 'react'
import PropTypes from 'prop-types'

import { IconBack } from './Icons'

export const ButtonLink = (props = {}) => {
  let cls = 'btn'

  cls += props.icon ? ' btn--icon' : ''
  cls += props.className ? ` ${props.className}` : ''

  return (
    <a className={cls} href={props.href} onClick={props.onClick}>
      {props.label}
      {props.icon}
    </a>
  )
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func
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
