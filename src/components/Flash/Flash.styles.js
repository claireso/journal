import { styled } from '@theme'

import { Button } from '../Buttons'

export const Wrapper = styled('div', {
  fontSize: '$4',
  mb: '$5',
  p: '$5',
  position: 'relative',
  textAlign: 'center',
  opacity: 0,

  variants: {
    status: {
      default: {
        backgroundColor: '$primary100',
        color: '$white',
        borderColor: '$primary200'
      },
      error: {
        background: '$error100',
        color: '$white',
        borderColor: '$error200'
      },
      success: {
        background: '$success100',
        color: '$white',
        borderColor: '$success200'
      },
      info: {
        backgroundColor: '$tertiary100',
        color: '$gray600',
        borderColor: '$tertiary200'
      }
    },
    separator: {
      true: {
        borderTopStyle: 'solid',
        borderTopWidth: '3px'
      }
    }
  }
})

export const ButtonClose = styled(Button, {
  p: '0 $5',
  alignItems: 'center',
  display: 'flex',
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  '> svg': {
    fill: 'currentColor',
    m: 0
  }
})
