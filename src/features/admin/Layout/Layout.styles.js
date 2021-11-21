import styled, { createGlobalStyle } from 'styled-components'

import { StyledButton } from '@components/Buttons'

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
  --primary-lighter: hsl(var(--base-primary), 44%, 51%);
  --primary-darker: hsl(var(--base-primary), 44%, 42%);

  --base-secondary: 192;
  --secondary-normal: hsl(var(--base-secondary), 15%, 94%);
  --secondary-darker: hsl(var(--base-secondary), 15%, 89%);
  --secondary-lighter: hsl(var(--base-secondary), 15%, 98%);

  --base-ternary: 51;
  --ternary-normal: hsl(var(--base-ternary), 100%, 68%);

  --base-error: 0;
  --error-normal: hsl(var(--base-error), 100%, 50%);
  --error-darker: hsl(var(--base-error), 100%, 45%);

  --base-success: 118;
  --success-normal: hsl(var(--base-success), 76%, 46%);
  --success-darker: hsl(var(--base-success), 76%, 40%);

  --white: hsl(0, 0%, 100%);

  --base-gray: 0;
  --gray-normal: hsl(var(--base-gray), 1%, 81%); // gray -1
  --gray-darker: hsl(var(--base-gray), 0%, 60%); // gray 2
  --gray-darker-2: hsl(var(--base-gray), 0%, 27%); // gray 3
  --gray-darker-3: hsl(var(--base-gray), 0%, 17%); // gray 4

  --border-color: var(--gray-normal);
  --border-color-focus: var(--gray-darker);

  --box-shadow: #e6e6e6;

  --gutter: 2rem;
  --container-max-width: 96rem;

  // typo
  --font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  --font-size-normal: 1.4rem;
  --font-size-smaller: 1.2rem;

  // components
  // flash
  --flash-default: var(--primary-normal);
  --flash-default-border: var(--primary-darker);
  --flash-default-text: var(--white);

  --flash-success: var(--success-normal);
  --flash-success-border: var(--success-darker);
  --flash-success-text: var(--white);

  --flash-error: var(--error-normal);
  --flash-error-border: var(--error-darker);
  --flash-error-text: var(--white);

  // tabs
  --tab-active: var(--ternary-normal);
  --tab-hover: var(--white);
  --tab-default: var(--secondary-normal);

  // toolbar
  --toolbar-bg: var(--gray-darker-3);
  --toolbar-height: 6rem;

  // form
  --form-input-bg: var(--white);


  background: var(--secondary-normal);
  color: var(--text);
  font-family: var(--font-family);
  font-size: 16px;
  margin: 0;
  min-width: 70rem;
  main {
    max-width: var(--container-max-width);
    padding: calc(var(--gutter)*3.5) var(--gutter);
    margin: 0 auto;
  }
  svg {
    fill: currentColor;
  }
  a {
    text-decoration: none;
    transition: color 150ms ease;
  }
}
`

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 6rem auto;
  grid-template-areas:
    'title toolbar'
    'sidebar content';
  min-height: 100vh;
`

export const Sidebar = styled.div`
  grid-area: sidebar;
`

export const Content = styled.div`
  background: var(--white);
  border-left: 1px solid var(--gray-normal);
  box-shadow: 0 6px 6px #e0dede;
  grid-area: content;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  grid-area: title;
  line-height: 6rem;
  margin: 0;
  text-align: center;
`

export const LinkGoToWebsite = styled.a`
  display: flex;
  align-items: center;
  color: var(--text-normal);
  font-size: var(--font-size-smaller);

  box-shadow: 0 1px 0 var(--white) inset;
  line-height: 1.4;
  padding: 2rem 2rem 2rem 4rem;

  &:hover {
    color: var(--primary-normal);
  }

  > svg {
    margin: 0 0 0 0.4rem;
  }
`

export const ButtonToSignOut = styled(StyledButton)`
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
  display: block;
  line-height: 1;
  max-width: 10rem;
  padding: 0.8rem 1.2rem;

  &:hover {
    background: var(--white);
    color: var(--text-normal);
  }
`

export const ToolbarWrapper = styled.div`
  grid-area: toolbar;
  position: sticky;
  top: 0;
  z-index: 10;
`
