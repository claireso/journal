import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Loader = styled.div`
  animation: ${pulse} 800ms ease-in-out infinite alternate;
  margin: 2rem 0;

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

export default Loader
