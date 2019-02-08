import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledToolbar = styled.div`
  background: var(--gray-4);
  color: var(--white);
  display: flex;
  height: 6rem;
  justify-content: flex-end;
  padding: 1.3rem 2rem;

  > p {
    align-items: center;
    display: flex;
    margin: 0;
  }
`

const Toolbar = (props = {}) => {
  return <StyledToolbar>{props.children}</StyledToolbar>
}

Toolbar.propTypes = {
  children: PropTypes.node
}

export default Toolbar
