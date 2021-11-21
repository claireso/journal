import styled from 'styled-components'

export const ErrorBoundaryWrapper = styled.div`
  border-radius: 4px;
  grid-column: 1 / -1;
  max-width: 610px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: #f31616;
    margin: 0 0 20px;
  }

  p {
    margin: 0;
  }

  code {
    background: #faebd7;
    display: block;
    margin: 20px 0 0;
    overflow-wrap: break-word;
    padding: 20px;
    text-align: left;
  }
`

export const RefreshButton = styled.button`
  appearance: none;
  background: #000;
  border: 1px solid var(--gray-normal);
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  display: inline-block;
  font-family: 'Roboto', Arial, sans-serif;
  font-weight: 700;
  font-size: 14px;
  outline: none;
  padding: 1rem 1.2rem 1.1rem;
  text-decoration: none;
  width: auto;
  will-change: border-color;
  transition: border-color 150ms ease-out;

  &:hover {
    border-color: var(--gray-darker-2);
  }
`
