import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 62.5%;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  --text: #333;
  --primary: #8e44ad;
  --yellow: #ffe65d;
  --yellow-darker: #ffdf32;
  --gray-1: #e2dfdf;
  --gray-2: #6b6b6b;
  --gray-3: #bfbcbc;
  --gray-4: #edeff5;
  --container-max-width: 128rem;
  --grid-number-column-small: 6;
  --grid-number-column-large: 12;
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 16px;
  margin: 0;
}
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(var(--grid-number-column-small), 1fr);
  grid-gap: 2rem;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 2rem;
  @media (min-width: 800px) {
    grid-gap: 0 2rem;
    grid-template-columns: repeat(var(--grid-number-column-large), 1fr);
    padding-top: 4rem;
  }
`

export const LoaderWrapper = styled.div`
  grid-column: 1 / -1;
`
