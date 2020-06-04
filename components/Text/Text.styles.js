import styled from 'styled-components'

export default styled.p.attrs((props) => ({
  align: props.align || 'left'
}))`
  text-align: ${(props) => props.align};
  font-size: 1.2rem;
`
