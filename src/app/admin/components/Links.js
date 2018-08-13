import React from 'react'
import PropTypes from 'prop-types'

import { IconBack } from './Icons'

export const ButtonLink = (props = {}) => {
  let cls = 'btn'

  cls += props.icon ? ' btn--icon' : ''
  cls += props.className ? ` ${props.className}` : ''

  return (
    <a
      className={cls}
      href={props.href || '#'}
      onClick={props.onClick}
      title={props.title}
    >
      {props.label}
      {props.icon}
    </a>
  )
}

ButtonLink.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
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

export const ButtonIcon = (props = {}) => {
  return (
    <a
      className="btn-icon"
      href="#"
      onClick={props.onClick}
      role="button"
      title={props.title}
    >
      {props.icon}
    </a>
  )
}

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.node.isRequired
}
