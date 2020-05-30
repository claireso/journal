// @TODO: migrate to new structure
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withInViewStatement from '@utils/hoc/withInViewStatement'

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
    width: 400,
    height: 600,
    cellWidth: {
      large: 4,
      small: 5
    }
  },
  [LANDSCAPE]: {
    width: 820,
    height: 546.6666,
    cellWidth: {
      large: 8,
      small: 6
    }
  },
  [SQUARE]: {
    width: 505,
    height: 505,
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

const getRatio = (props) => {
  const config = getConfig(props)

  return (config.height / config.width).toFixed(6)
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

const PhotoWrapper = styled.figure`
  grid-row-start: ${(props) => props.row};
  grid-column: ${(props) => getColumn({ ...props, screen: SMALL_SCREEN })};
  margin: 0;
  @media (min-width: 800px) {
    grid-column: ${(props) => getColumn({ ...props, screen: LARGE_SCREEN })};
    & + figure {
      margin-top: 20rem;
    }
  }
`

const Title = styled.figcaption`
  font-size: 1.3rem;
`

const Description = styled.span`
  color: var(--gray-2);
  display: block;
  font-size: 1.1rem;
  font-style: italic;
  margin: 0.4rem 0 0;
`

const PictureWrapper = styled.div`
  background: var(--gray-4);
  position: relative;
  padding-top: calc(${(props) => getRatio(props)} * 100%);
  width: 100%;
  margin: 0 0 1rem;
`

const Picture = styled(LazyLoadedImage).attrs((props) => ({
  alt: '',
  src: `/img/${props.name}`
}))`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
`

class Photo extends React.PureComponent {
  render() {
    return (
      <PhotoWrapper
        position={this.props.position}
        portrait={this.props.portrait}
        square={this.props.square}
        row={this.props.row}
      >
        <PictureWrapper
          portrait={this.props.portrait}
          square={this.props.square}
        >
          {this.props.inView && <Picture name={this.props.name} />}
        </PictureWrapper>
        <Title>
          <span dangerouslySetInnerHTML={{ __html: this.props.title }} />

          {this.props.description && (
            <Description>{this.props.description}</Description>
          )}
        </Title>
      </PhotoWrapper>
    )
  }
}

Photo.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  portrait: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  square: PropTypes.bool.isRequired,
  title: PropTypes.string,
  inView: PropTypes.bool.isRequired
}

export default withInViewStatement(Photo)
