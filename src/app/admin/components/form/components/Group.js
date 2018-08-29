import styled from 'styled-components'

export const Group = styled.div`
  margin: 0 0 2rem;
`

export const GroupInline = styled(Group)`
  display: flex;
  align-items: center;

  > label {
    margin: 0 5px 0 0;
  }
`
