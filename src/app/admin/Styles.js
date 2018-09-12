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
    --primary-lighter: #9b59b6;
    --secondary: #ecf0f1;
    --secondary-darker: #dcdede;
    --hightlight: #ffe65d;
    --error: #f00;
    --white: #fff;
    --gray-1: #d4d3d3;
    --gray-2: #999;
    --gray-3: #464646;
    --gutter: 2rem;
    --container-max-width: 96rem;
  }

  body {
    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  main {
    max-width: var(--container-max-width);
    padding: calc(var(--gutter)*2) var(--gutter);
    margin: 0 auto;
  }

  svg {
    fill: currentColor;
  }
`