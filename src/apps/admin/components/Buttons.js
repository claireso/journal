import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Loader from '@common/components/Loader'

export const Button = styled.button`
  appearance: none;
  align-items: center;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.2rem;
  outline: none;
  padding: 1rem;
  transition: background 150ms ease-out;

  > svg {
    margin: 0 -0.3rem 0 0.3rem;
  }

  & + & {
    margin: 0 0 0 1rem;
  }
`

const StyledPrimaryButton = styled(Button)`
  background: var(--primary);
  color: white;

  &:hover {
    background: var(--primary-lighter);
  }
`

const StyledPrimaryButtonLoading = styled(StyledPrimaryButton).attrs(() => ({
  children: <Loader as="span" />
}))`
  padding: 1.1rem 1rem 1.3rem;

  ${Loader} {
    margin: 0;

    &:after {
      background: #fff;
    }
  }
`

export const PrimaryButton = props => {
  return props.isLoading ? (
    <StyledPrimaryButtonLoading />
  ) : (
    <StyledPrimaryButton {...props} />
  )
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool
}

export const SecondaryButton = styled(Button)`
  background: var(--secondary);
  color: var(--text);

  &:hover {
    background: var(--secondary-darker);
  }

  & + ${StyledPrimaryButton} {
    margin-left: 1rem;
  }
`

export const PagerButton = styled(SecondaryButton)`
  width: 4.4rem;
  height: 4.4rem;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`

export const ButtonIcon = styled(Button)`
  background: none;
  color: inherit;

  > svg {
    margin: 0;
  }

  & + & {
    margin: 0;
  }
`
