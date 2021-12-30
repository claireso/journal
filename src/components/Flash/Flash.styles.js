import styled, { css } from 'styled-components'

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

export const FlashWrapper = styled.div`
  background: ${(props) => getColor(props.status).background};
  color: ${(props) => getColor(props.status).text};
  font-size: var(--font-size-normal);
  margin: 0 0 var(--gutter);
  padding: 2rem;
  position: relative;
  text-align: center;
  opacity: 0;

  ${(props) =>
    props.withBorder &&
    css`
      border-top: 3px solid ${getColor(props.status).border};
    `}
`

export const FlashButtonClose = styled(StyledButton)`
  padding: 0 2rem;

  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  > svg {
    fill: currentColor;
    margin: 0;
  }
`
