import React from 'react'
import styled from 'styled-components'
import Loader from '@common/components/Loader'

export const SubmitButton = styled.input.attrs({
  type: 'submit'
})`
  appearence: none;
  background: var(--primary);
  border: none;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 1.4rem;
  margin: calc(var(--gutter) * 2) 0 0;
  outline: none;
  padding: 1.5rem 5rem;
  width: 100%;
  transition: background 150ms ease-out;

  &:hover {
    background: var(--primary-lighter);
  }
`

export const SubmitButtonLoading = styled(SubmitButton).attrs({
  children: <Loader />
})`
  padding: 1.8rem 5rem 1.9rem;

  ${Loader} {
    margin: 0 auto;

    &:after {
      background: #fff;
    }
  }
`

export default props =>
  props.isLoading ? (
    <SubmitButtonLoading as="div" />
  ) : (
    <SubmitButton {...props} />
  )
