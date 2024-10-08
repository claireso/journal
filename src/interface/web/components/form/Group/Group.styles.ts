import { styled } from '@web/oldtheme'

export const Group = styled('div', {
  margin: '0 0 $5'
})

export const GroupInline = styled(Group, {
  display: 'flex',
  alignItems: 'center',
  '> label': {
    margin: '0 1rem 0 0'
  }
})
