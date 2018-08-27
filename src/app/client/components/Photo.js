import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const mapPosition = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end'
}

const Wrapper = styled.figure`
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

const Title = styled.figcaption`
  font-size: 1.2rem;
`

const Description = styled.span`
  color: #c7c7c7;
  display: block;
  font-size: 1rem;
  font-style: italic;
  margin: 0.4rem 0 0;
`

const Picture = styled.img.attrs({
  alt: '',
  height: props => (props.portrait || props.square ? 578 : 540),
  src: props => `/img/${props.name}`,
  width: props => (props.portrait ? 385 : props.square ? 578 : 810)
})`
  display: block;
  max-width: 100%;
  margin: 0 0 1rem;
  height: auto;
`

const Photo = (props = {}) => {
  return (
    <Wrapper position={props.position}>
      <div>
        <Picture
          portrait={props.portrait}
          square={props.square}
          name={props.name}
        />
        <Title>
          {props.title}

          {props.description && <Description>{props.description}</Description>}
        </Title>
      </div>
    </Wrapper>
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
