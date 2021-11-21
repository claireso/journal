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
  background: var(--form-input-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: var(--font-size-normal);
  outline: none;
  padding: 1.1rem 2.6rem 1.1rem 1.1rem;
  &:focus {
    border-color: var(--border-color-focus);
  }
`
