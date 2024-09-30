import { styled } from '@web/theme'

export const SelectWrapper = styled('div', {
  position: 'relative',
  svg: {
    position: 'absolute',
    top: '50%',
    right: '0.9rem',
    bottom: 0,
    transform: 'translate(0, -50%) rotate(90deg)',
    pointerEvents: 'none'
  }
})

export const StyledSelect = styled('select', {
  appearance: 'none',
  background: '$white',
  border: '1px solid $gray200',
  borderRadius: '0.5rem',
  boxShadow: '$2',
  cursor: 'pointer',
  fontFamily: '$sansSerif',
  fontSize: '$4',
  outline: 'none',
  padding: '1.1rem 2.6rem 1.1rem 1.1rem',
  transition: '$borderColor',
  '&:focus': {
    borderColor: '$gray300'
  }
})
