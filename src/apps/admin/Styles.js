import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .admin {
    --text: #333;
    --primary: #8e44ad;
    --primary-lighter: #9b59b6;
    --secondary: #ecf0f1;
    --secondary-darker: #dcdede;
    --hightlight: #ffe65d;
    --error: #f00;
    --success: #23d01c;
    --white: #fff;
    --gray-1: #d4d3d3;
    --gray-2: #999;
    --gray-3: #464646;
    --gray-4: #2b2c2c;
    --gray-5: #fbfcfc;
    --gutter: 2rem;
    --container-max-width: 96rem;

    background: var(--secondary);
    color: var(--text);
    font-family: "Roboto", Arial, sans-serif;
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
