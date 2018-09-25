import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  :root {
    --text: #333;
    --primary: #8e44ad;
    --yellow: #ffe65d;
    --yellow-darker: #ffdf32;
    --gray-1: #e2dfdf;
    --gray-2: #868585;
    --gray-3: #bfbcbc;
    --gray-4: #edeff5;
    --container-max-width: 131.5rem;
  }

  body {
    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .is-hidden {
    display: none;
  }

  .notification {
    background: var(--yellow);
    cursor: pointer;
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 1rem;
    position: sticky;
    top: 0;
    transition: background 250ms ease-out;
    z-index: 10;
  }

  .notification:hover {
    background: var(--yellow-darker);
  }

  .notification__inner {
    max-width: var(--container-max-width);
    margin: 0 auto;
    text-align: center;
  }

  .notification__button-close {
    appearance: none;
    background: none;
    border: none;
    bottom: 0;
    cursor: pointer;
    padding: 1rem;
    position: absolute;
    outline: none;
    right: 0;
    top: 0;
    width: 50px;
  }
`
