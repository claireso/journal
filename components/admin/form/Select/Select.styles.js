import styled from 'styled-components'

export const SelectWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    right: 0.9rem;
    bottom: 0;
    transform: translate(0, -50%) rotate(90deg);
    pointer-events: none;
  }
`

export const StyledSelect = styled.select`
  appearance: none;
  background: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.4rem;
  outline: none;
  padding: 0.8rem 2.6rem 0.8rem 0.8rem;
  &:focus {
    border-color: var(--gray-2);
  }
`
