import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .client {
    --text: #333;
    --primary: #8e44ad;
    --yellow: #ffe65d;
    --yellow-darker: #ffdf32;
    --gray-1: #e2dfdf;
    --gray-2: #6b6b6b;
    --gray-3: #bfbcbc;
    --gray-4: #edeff5;
    --container-max-width: 131.5rem;

    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }
`
