import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export default styled.div`
  margin: var(--gutter) 0;
  animation: ${pulse} 800ms ease-in-out infinite alternate;

  &:after {
    background: var(--primary);
    border-radius: 50%;
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    margin: 0 auto;
  }
`
