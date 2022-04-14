import { styled } from '@theme'

export const StyledInput = styled('input', {
  appearance: 'none',
  background: '$white',
  border: '1px solid $gray200',
  borderRadius: '$1',
  boxShadow: '$2',
  display: 'block',
  fontFamily: '$sansSerif',
  outline: 'none',
  p: '$2 $3',
  width: '100%',
  fontSize: '$4',
  lineHeight: 1.71,
  transition: '$borderColor',
  '&:focus': {
    borderColor: '$gray300'
  }
})
