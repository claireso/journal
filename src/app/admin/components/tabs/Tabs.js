import styled from 'styled-components'

const Tabs = styled.ul`
  border-bottom: 1px solid #ecf0f1;
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  & .is-active {
    background: #ffe65d;
    color: #333;
  }
`

export default Tabs
