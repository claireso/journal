import styled from 'styled-components'
import { animated } from 'react-spring'

const mapFlashBackground = {
  default: 'var(--primary)',
  error: 'var(--error)',
  success: 'var(--success)'
}

export const FlashWrapper = animated(styled.div`
  background: ${(props) =>
    mapFlashBackground[props.status] || mapFlashBackground['default']};
  color: var(--white);
  font-size: 1.4rem;
  margin: 0 0 var(--gutter);
  padding: 2rem;
  position: relative;
  text-align: center;
  button {
    align-items: center;
    display: flex;
    position: absolute;
    right: 0.6rem;
    top: 0;
    bottom: 0;
  }
`)
