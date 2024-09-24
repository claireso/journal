import { styled } from '@theme'

export const UploaderWrapper = styled('div', {
  border: '1px solid $gray200',
  borderRadius: '$1',
  boxShadow: '$2',
  overflow: 'hidden',
  position: 'relative'
})

export const UploaderPreview = styled('div', {
  p: '$5',
  img: {
    m: '0 auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '17rem'
  }
})

export const UploaderContent = styled('div', {
  p: '$5',
  svg: {
    display: 'block',
    size: '2.4rem',
    fill: '$primary100'
  },
  span: {
    display: 'block',
    fontSize: '$4',
    mt: '1rem',
    textAlign: 'center'
  },
  small: {
    color: '$gray300',
    display: 'block',
    fontSize: '$3',
    mt: '0.5rem',
    textAlign: 'center'
  }
})

export const UploaderIcon = styled('div', {
  size: '2.4rem',
  m: '0 auto'
})

export const UploaderInput = styled('input', {
  bottom: 0,
  cursor: 'pointer',
  left: 0,
  opacity: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%'
})

export const UploaderError = styled('div', {
  background: '$error100',
  color: '$error300',
  fontSize: '$3',
  padding: '$3 0 $3',
  textAlign: 'center'
})
