/* eslint indent: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styled from 'styled-components'

const getProps = ({ isCurrent, isPartiallyCurrent }) => {
  return isCurrent || isPartiallyCurrent
    ? {
        style: {
          background: 'var(--hightlight)',
          color: 'var(--text)'
        }
      }
    : null
}

const StyledTab = styled.li`
  a {
    background: var(--secondary);
    border-bottom: none;
    border-radius: 0.2rem 0.2rem 0 0;
    color: var(--text);
    display: block;
    font-size: 1.4rem;
    padding: 2rem 2rem 2rem 4rem;
    text-decoration: none;
    transition: background 150ms ease-out;

    &:hover {
      background: var(--gray-5);
    }
  }
`

const Tab = (props = {}) => {
  return (
    <StyledTab>
      <Link to={props.to} getProps={getProps}>
        {props.children}
      </Link>
    </StyledTab>
  )
}

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Tab
