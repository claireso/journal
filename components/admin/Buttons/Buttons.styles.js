import React from 'react'

import styled from 'styled-components'

import Loader from '@components/Loader'

export const Button = styled.button`
  appearance: none;
  align-items: center;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.2rem;
  line-height: 1.3333333;
  outline: none;
  padding: 1.6rem;
  transition: background 150ms ease-out;
  > svg {
    margin: 0 -0.4rem 0 0.4rem;
  }
  & + & {
    margin: 0 0 0 0.8rem;
  }
`

export const StyledPrimaryButton = styled(Button)`
  background: var(--primary);
  color: white;
  &:hover {
    background: var(--primary-lighter);
  }
`

export const StyledPrimaryButtonLoading = styled(StyledPrimaryButton).attrs(
  () => ({
    children: <Loader as="span" />
  })
)`
  padding: 1.1rem 1rem 1.3rem;
  ${Loader} {
    margin: 0;
    &:after {
      background: #fff;
    }
  }
`

export const SecondaryButton = styled(Button)`
  background: var(--secondary);
  color: var(--text);
  &:hover {
    background: var(--secondary-darker);
  }
  & + ${StyledPrimaryButton} {
    margin-left: 0.8rem;
  }
`

export const PagerButton = styled(SecondaryButton)`
  align-items: center;
  font-size: 1.4rem;
  height: 4.4rem;
  justify-content: center;
  padding: 0;
  width: 4.4rem;
`

export const ButtonIcon = styled(Button)`
  background: none;
  color: inherit;
  padding: 0.8rem;
  > svg {
    margin: 0;
  }
  & + & {
    margin: 0;
  }
`
