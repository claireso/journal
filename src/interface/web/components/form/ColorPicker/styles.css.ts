import { cmpStyles, gap } from '@web/theme'

export const wrapper = cmpStyles({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 2.4rem)',
  ...gap('size-3')
})

export const input = cmpStyles({
  opacity: 0,
  position: 'fixed',
  width: 0
})

export const label = cmpStyles({
  display: 'flex',
  textIndent: '-10000px',
  height: '2.4rem',
  borderRadius: '50%',
  cursor: 'pointer',
  background: 'currentcolor',
  selectors: {
    'input:checked + &': {
      boxShadow: '0 0 0 2px #fff, 0 0 0 4px currentColor'
    },
    'input:disabled + &': {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }
})
