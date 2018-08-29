/* eslint indent: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styled from 'styled-components'

const getProps = ({ isCurrent, isPartiallyCurrent }) => {
  return isCurrent || isPartiallyCurrent
    ? {
        style: {
          background: '#FFE65D',
          color: '#333'
        }
      }
    : null
}

const StyledTab = styled.li`
  a {
    background: #ecf0f1;
    border-bottom: none;
    color: #333;
    display: inline-block;
    font-size: 1.4rem;
    padding: 2rem;
    text-decoration: none;
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
