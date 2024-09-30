import { styled } from '@web/theme'

export const List = styled('ul', {
  m: 0,
  p: 0
})

export const ListHeader = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$5',
  '> h1': {
    // @TODO use Heading1/2/3..
    lineHeight: 1.835,
    m: 0,
    '> span': {
      color: '$gray300',
      fontSize: '2rem',
      fontWeight: '$normal',
      lineHeight: 1
    }
  }
})
