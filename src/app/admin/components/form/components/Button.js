import styled from 'styled-components'

export default styled.input.attrs({
  type: 'submit'
})`
  appearence: none;
  background: #8e44ad;
  border: none;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 1.4rem;
  margin: 4rem 0 0;
  outline: none;
  padding: 1.5rem 5rem;
  width: 100%;
  transition: background 150ms ease-out;

  &:hover {
    background: #9b59b6;
  }
`
