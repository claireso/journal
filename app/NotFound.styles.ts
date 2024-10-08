import { styled } from '@web/oldtheme'
import { Button } from '@web/components/Buttons'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '$tertiary100'
})

export const Title = styled('div', {
  fontSize: '20vw',
  fontWeight: '$bold'
})

export const ButtonBack = styled('div', {
  position: 'fixed',
  left: '$5',
  top: '$5',
  '> a': {
    fontSize: '$4',
    background: 'transparent',
    color: '$gray700',
    border: '2px solid $gray700',
    display: 'block',
    lineHeight: 1,
    borderRadius: '$2',
    transition: '$button',
    p: '$2',
    '&:hover': {
      background: '$gray700',
      color: '$white'
    }
  }
})
