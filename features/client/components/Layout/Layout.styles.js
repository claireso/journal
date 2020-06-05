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
  // theme
  --base-text: 0;
  --text-normal: hsl(var(--base-text), 0%, 20%);

  --base-primary: 282;
  --primary-normal: hsl(var(--base-primary), 44%, 47%);

  --base-secondary: 192;
  --secondary-normal: hsl(var(--base-secondary), 15%, 94%);
  --secondary-darker: hsl(var(--base-secondary), 15%, 89%);

  --base-yellow: 51;
  --yellow-normal: hsl(var(--base-yellow), 100%, 68%);
  --yellow-darker: hsl(var(--base-yellow), 100%, 50%);

  --base-gray: 0;
  --gray-normal: hsl(var(--base-gray), 0%, 42%);
  --gray-lighter: hsl(var(--base-gray), 0%, 93%);

  --container-max-width: 128rem;
  --grid-number-column-small: 6;
  --grid-number-column-large: 12;

  // typo
  --font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  --font-size-normal: 1.4rem;
  --font-size-smaller-1: 1.3rem;
  --font-size-smaller-2: 1.2rem;
  --font-size-smaller-3: 1.1rem;

  // flash message
  --flash-default: var(--yellow-normal);
  --flash-default-border: var(--yellow-darker);
  --flash-default-text: var(--text-normal);

  color: var(--text-normal);
  font-family: var(--font-family);
  font-size: 16px;
  margin: 0;
}

a {
  text-decoration: none;
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
