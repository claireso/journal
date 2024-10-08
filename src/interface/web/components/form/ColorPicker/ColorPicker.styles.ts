import { styled } from '@web/oldtheme'

export const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 2.5rem)',
  gap: '$3'
})

export const Input = styled('input', {
  opacity: 0,
  position: 'fixed',
  width: 0
})

export const Label = styled('label', {
  display: 'flex',
  textIndent: '-10000px',
  height: '2.5rem',
  borderRadius: '50%',
  cursor: 'pointer',
  background: 'currentColor',
  'input:checked + &': {
    boxShadow: '0 0 0 3px #fff, 0 0 0 5px currentColor'
  },
  'input:disabled + &': {
    opacity: 0.5,
    pointerEvents: 'none'
  }
})
