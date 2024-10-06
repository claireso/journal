import { styled, theme } from '@web/theme'

import { ButtonIcon } from '../Buttons'

export const Wrapper = styled('div', {
  background: 'rgba(43, 44, 44, 0.4)',
  bottom: 0,
  overflow: 'auto',
  position: 'fixed',
  left: '15rem',
  right: 0,
  top: theme.sizes.toolbarHeight.value,
  willChange: 'opacity'
})

export const Inner = styled('div', {
  background: '$white',
  boxShadow: '0 0px 11px #898c8e',
  padding: '$5',
  maxWidth: '45rem',
  minHeight: 'calc(100vh)',
  ml: 'auto'
})

export const ButtonClose = styled(ButtonIcon, {
  position: 'absolute',
  right: '1.2rem',
  top: '1.2rem'
})
