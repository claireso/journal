import { styled, keyframes } from '@theme'

const pulse = keyframes({
  '0%': { opacity: '0' },
  '100%': { opacity: '1' }
})

export default styled('span', {
  display: 'block',
  m: '$5 0',
  animation: `${pulse} 800ms ease-in-out infinite alternate`,
  '&::after': {
    background: '$primary100',
    borderRadius: '50%',
    content: `''`,
    display: 'block',
    size: '1rem',
    m: '0 auto'
  }
})
