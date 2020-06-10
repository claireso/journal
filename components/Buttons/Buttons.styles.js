import styled from 'styled-components'

import Loader from '../Loader'

export const DefaultButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  display: inline-flex;
  font-family: var(--font-family);
  outline: none;
  padding: 0;
  margin: 0;
`

export const StyledButton = styled(DefaultButton)`
  border-radius: 0.2rem;
  font-size: var(--font-size-smaller);
  line-height: 1.3333333;
  padding: 1.6rem;
  transition: background 150ms ease-out;

  > svg {
    margin: 0 -0.4rem 0 0.4rem;
  }

  & + & {
    margin: 0 0 0 0.8rem;
  }
`

export const PrimaryButton = styled(StyledButton)`
  background: var(--primary-normal);
  color: white;

  &:hover {
    background: var(--primary-lighter);
  }
`

export const PrimaryButtonLoading = styled(PrimaryButton).attrs(() => ({
  children: <Loader as="span" />
}))`
  padding: 1.9rem 1.6rem;
  cursor: default;

  ${Loader} {
    margin: 0;

    &:after {
      background: #fff;
    }
  }
`

export const SecondaryButton = styled(StyledButton)`
  background: var(--secondary-normal);
  color: var(--text-normal);

  &:hover {
    background: var(--secondary-darker);
  }

  & + ${PrimaryButton} {
    margin-left: 0.8rem;
  }
`

export const ButtonIcon = styled(StyledButton)`
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
