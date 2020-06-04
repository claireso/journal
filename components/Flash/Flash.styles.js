import styled from 'styled-components'
import { animated } from 'react-spring'

import { StyledButton } from '../Buttons'

const mapFlashColors = {
  default: {
    background: 'var(--flash-default)',
    border: 'var(--flash-default-border)',
    text: 'var(--flash-default-text)'
  },
  error: {
    background: 'var(--flash-error)',
    border: 'var(--flash-error-border)',
    text: 'var(--flash-error-text)'
  },
  success: {
    background: 'var(--flash-success)',
    border: 'var(--flash-success-border)',
    text: 'var(--flash-success-text)'
  }
}

const getColor = (status) => {
  return mapFlashColors[status] || mapFlashColors.default
}

export const FlashWrapper = animated(styled.div`
  background: ${(props) => getColor(props.status).background};
  color: ${(props) => getColor(props.status).text};
  font-size: 1.4rem;
  margin: 0 0 var(--gutter);
  padding: 2rem;
  position: relative;
  text-align: center;

  & + & {
    border-top: 3px solid ${(props) => getColor(props.status).border};
  }
`)

export const FlashButtonClose = styled(StyledButton)`
  padding: 0 2rem;

  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  > svg {
    margin: 0;
  }
`
