import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 2.5rem);
  gap: 1.2rem;
`

export const Input = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;
`

export const Label = styled.label`
  display: flex;
  text-indent: -10000px;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  background: currentColor;

  input:checked + & {
    box-shadow: 0 0 0 3px #fff, 0 0 0 5px currentColor;
  }
`
