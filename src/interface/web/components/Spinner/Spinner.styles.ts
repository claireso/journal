import { styled, keyframes } from '@web/oldtheme'

const loop = keyframes({
  '0%': { rotate: '0' },
  '100%': { rotate: '360deg' }
})

export default styled('div', {
  borderColor: '$primary300',
  borderRightColor: '$primary400',
  borderWidth: '4px',
  borderStyle: 'solid',
  size: '2.4rem',
  borderRadius: '50%',
  animation: `${loop} 450ms cubic-bezier(.17,.67,.78,1.02) infinite`
})
