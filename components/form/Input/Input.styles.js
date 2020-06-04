import styled from 'styled-components'

export const StyledInput = styled.input`
  appearance: none;
  background: var(--form-input-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.4rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  outline: none;
  padding: 0.8rem 1.2rem;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.71;
  transition: border-color 250ms ease-out;
  &:focus {
    border-color: var(--border-color-focus);
  }
`
