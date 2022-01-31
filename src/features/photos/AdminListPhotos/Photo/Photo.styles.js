import { styled } from '@theme'

export const PhotoWrapper = styled('li', {
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '8rem auto 12rem',
  gridColumnGap: '$4',
  p: '$5',
  transition: '$background',
  '&:hover': {
    background: '$secondary100'
  },
  '& + &': {
    borderTop: '1px solid $secondary200'
  }
})

export const PhotoPicture = styled('div', {
  height: '8rem',
  img: {
    height: '100%',
    objectFit: 'contain',
    width: '100%',
    filter: `
      drop-shadow(0 -6px 0 currentColor)
      drop-shadow(0 6px 0 currentColor)
      drop-shadow(-6px 0 0 currentColor)
      drop-shadow(6px 0 0 currentColor)
    `
  }
})

export const PhotoInner = styled('div', {
  flex: 1
})

export const PhotoTitle = styled('h2', {
  fontSize: '$4',
  m: '$1 0 $3',
  fontWeight: '$semiBold'
})

export const PhotoDescription = styled('p', {
  color: '$gray500',
  fontSize: '$2'
})

export const PhotoTools = styled('p', {
  placeSelf: 'center flex-end',
  transition: '$opacity',
  button: {
    opacity: 0.55,
    transition: '$opacity',
    '&:hover': {
      opacity: 1
    }
  }
})
