import styled from 'styled-components'

export const Group = styled.div`
  margin: 0 0 var(--gutter);
`

export const GroupInline = styled(Group)`
  display: flex;
  align-items: center;
  > label {
    margin: 0 1rem 0 0;
  }
`
