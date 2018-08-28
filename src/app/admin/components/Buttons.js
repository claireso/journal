import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  align-items: center;
  border: none;
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

export const PrimaryButton = styled(Button)`
  background: #8e44ad;
  color: white;

  &:hover {
    background: #9b59b6;
  }
`

export const SecondaryButton = styled(Button)`
  background: #ecf0f1;
  color: #333;

  &:hover {
    background: #dcdede;
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
`
