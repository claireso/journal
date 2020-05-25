import styled from 'styled-components'
import { animated } from 'react-spring'

const mapFlashBackground = {
  default: 'var(--yellow)'
}

const mapFlashBorder = {
  default: 'var(--yellow-darker)'
}

export const FlashWrapper = animated(styled.div`
  background: ${(props) =>
    mapFlashBackground[props.status] || mapFlashBackground['default']};
  color: var(--white);
  font-size: 1.4rem;
  margin: 0 0 var(--gutter);
  padding: 1.5rem;
  position: relative;
  text-align: center;
  button {
    align-items: center;
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
  & + & {
    border-top: 3px solid
      ${(props) => mapFlashBorder[props.status] || mapFlashBorder['default']};
  }
`)
