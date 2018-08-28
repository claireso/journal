import styled from 'styled-components'

export default styled.p.attrs({
  align: props => props.align || 'left'
})`
  text-align: ${props => props.align};
  font-size: 1.2rem;
`
