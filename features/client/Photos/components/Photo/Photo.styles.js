import styled, { css } from 'styled-components'

import LazyLoadedImage from '@components/LazyLoadedImage'

const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const SQUARE = 'square'
const SMALL_SCREEN = 'small'
const LARGE_SCREEN = 'large'
const POSITION_LEFT = 'left'
const POSITION_RIGHT = 'right'
const GRID_COLUMN_NUMBER = 12

const configImages = {
  [PORTRAIT]: {
    cellWidth: {
      large: 4,
      small: 5
    }
  },
  [LANDSCAPE]: {
    cellWidth: {
      large: 8,
      small: 6
    }
  },
  [SQUARE]: {
    cellWidth: {
      large: 5,
      small: 5
    }
  }
}

const getConfig = ({ portrait, square } = {}) => {
  let key = LANDSCAPE

  if (portrait) key = PORTRAIT
  if (square) key = SQUARE

  return configImages[key]
}

const getColumnStart = ({ screen, ...props }) => {
  const config = getConfig(props)

  // On small screen, align left all images
  if (screen === SMALL_SCREEN) {
    return 1
  }

  // On large screen
  if (props.position === POSITION_LEFT) {
    return 2
  }

  if (props.position === POSITION_RIGHT) {
    return `calc(var(--grid-number-column-large) - ${config.cellWidth[screen]})`
  }

  // Position center
  // @FIXME: try to use var(--grid-number-column-large)
  return (GRID_COLUMN_NUMBER - config.cellWidth[screen]) / 2 + 1
}

const getColumn = ({ screen, ...props }) => {
  const config = getConfig(props)

  const columnEnd = config.cellWidth[screen]
  const columnStart = getColumnStart({ screen, ...props })

  return `${columnStart} / span ${columnEnd}`
}

export const PhotoWrapper = styled.figure`
  --shadow-width: 6vw;
  --shadow-width-smaller: 2rem;

  grid-row-start: ${(props) => props.row};
  grid-column: ${(props) => getColumn({ ...props, screen: SMALL_SCREEN })};
  margin: 0;

  @media (min-width: 800px) {
    grid-column: ${(props) => getColumn({ ...props, screen: LARGE_SCREEN })};
    & + figure {
      margin-top: 20rem;
    }
  }

  // highlight photo
  ${(props) =>
    props.color &&
    css`
      margin-top: var(--shadow-width-smaller);

      > div {
        box-shadow: 0 0 0 var(--shadow-width-smaller) currentColor;
        margin-bottom: calc(1rem + var(--shadow-width-smaller));

        @media (max-width: 799px) {
          &:after {
            background: currentColor;
            bottom: -2rem;
            content: '';
            display: block;
            left: 100%;
            position: absolute;
            top: -2rem;
            width: 99999px;
          }
        }
      }

      @media (min-width: 800px) {
        margin-top: var(--shadow-width);

        > div {
          box-shadow: 0 0 0 var(--shadow-width) currentColor;
          margin-bottom: calc(1rem + var(--shadow-width));
        }

        figure + & {
          margin-top: calc(20rem + var(--shadow-width));
        }
      }
    `}
`

export const Title = styled.figcaption`
  font-size: var(--font-size-smaller-1);
`

export const Description = styled.span`
  color: var(--gray-normal);
  display: block;
  font-size: var(--font-size-smaller-3);
  font-style: italic;
  margin: 0.4rem 0 0;
`

export const PictureWrapper = styled.div`
  background: currentColor;
  width: 100%;
  margin: 0 0 1rem;
  aspect-ratio: var(--aspect-ratio);

  @supports (not (aspect-ratio: 1 / 1)) and (not (aspect-ratio: 3 / 2)) and
    (not (aspect-ratio: 2 / 3)) {
    position: relative;
    padding-top: calc(100% / var(--aspect-ratio));
  }
`

export const Picture = styled(LazyLoadedImage).attrs((props) => ({
  alt: '',
  src: `/uploads/${props.name}`
}))`
  display: block;
  width: 100%;
  margin: 0;

  @supports (not (aspect-ratio: 1 / 1)) and (not (aspect-ratio: 3 / 2)) and
    (not (aspect-ratio: 2 / 3)) {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`
