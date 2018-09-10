import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const mapPosition = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end'
}

const mapSizes = {
  portrait: {
    width: 385,
    height: 578
  },
  landscape: {
    width: 810,
    height: 540
  },
  square: {
    width: 578,
    height: 578
  }
}

const getSize = ({ portrait, square } = {}) => {
  let key = 'landscape'

  if (portrait) key = 'portrait'
  if (square) key = 'square'

  return mapSizes[key]
}

const getRatio = props => {
  const size = getSize(props)

  return (size.height / size.width).toFixed(6)
}

const getMaxWidth = props => {
  const size = getSize(props)

  return `${size.width}px`
}

const PhotoWrapper = styled.figure`
  display: flex;
  justify-content: ${props => mapPosition[props.position]};
  margin: 2rem 0;
  padding: 0;

  @media (min-width: 800px) {
    margin: 8.5rem 0;
    padding: 0 8.5rem;

    & + figure {
      margin-top: 20rem;
    }
  }
`

const PhotoInner = styled.div`
  width: 100%;
  max-width: ${props => getMaxWidth(props)};
`

const Title = styled.figcaption`
  font-size: 1.2rem;
`

const Description = styled.span`
  color: var(--gray-2);
  display: block;
  font-size: 1rem;
  font-style: italic;
  margin: 0.4rem 0 0;
`

const PictureWrapper = styled.div`
  background: var(--gray-4);
  position: relative;
  padding-top: calc(${props => getRatio(props)} * 100%);
  width: 100%;
  margin: 0 0 1rem;
`
const Picture = styled.img.attrs({
  alt: '',
  src: props => `/img/${props.name}`
})`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
`

const Photo = (props = {}) => {
  return (
    <PhotoWrapper position={props.position}>
      <PhotoInner portrait={props.portrait} square={props.square}>
        <PictureWrapper portrait={props.portrait} square={props.square}>
          <Picture name={props.name} />
        </PictureWrapper>
        <Title>
          {props.title}

          {props.description && <Description>{props.description}</Description>}
        </Title>
      </PhotoInner>
    </PhotoWrapper>
  )
}

Photo.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  portrait: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  square: PropTypes.bool.isRequired,
  title: PropTypes.string
}

export default Photo
