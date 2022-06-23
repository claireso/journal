import { styled } from '@theme'

export const Text = styled('p', {
  fontSize: '$2',
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' }
    }
  }
})
