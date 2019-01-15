import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withInViewStatement from '@common/hoc/withInViewStatement'
import LazyLoadedImage from '@common/components/LazyLoadedImage'

import { PrimaryButton } from '@admin/components/Buttons'

const PhotoWrapper = styled.li`
  align-items: center;
  display: grid;
  grid-template-columns: 8rem auto 12rem;
  grid-column-gap: 1rem;
  padding: 1.5rem;
  transition: background 150ms ease-out;

  &:hover {
    background: var(--gray-5);
  }

  & + & {
    border-top: 1px solid var(--secondary);
  }
`

const PhotoPicture = styled.div`
  height: 8rem;

  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
`

const PhotoInner = styled.div`
  flex: 1;
`

const PhotoTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0.5rem 0 1rem;
`

const PhotoDescription = styled.p`
  color: var(--gray-3);
  font-size: 1.2rem;
`

const PhotoTools = styled.p`
  opacity: 0;
  place-self: center flex-end;
  transition: opacity 150ms ease-out;

  ${PhotoWrapper}:hover &,
  ${PhotoWrapper}:focus & {
    opacity: 1;
  }
`

class Photo extends React.PureComponent {
  render() {
    return (
      <PhotoWrapper>
        <PhotoPicture>
          {this.props.inView && (
            <LazyLoadedImage src={`/img/${this.props.name}`} />
          )}
        </PhotoPicture>
        <PhotoInner>
          {this.props.title && (
            <PhotoTitle
              dangerouslySetInnerHTML={{ __html: this.props.title }}
            />
          )}
          {this.props.description && (
            <PhotoDescription>{this.props.description}</PhotoDescription>
          )}
        </PhotoInner>
        <PhotoTools>
          <PrimaryButton onClick={this.props.onEdit.bind(this, this.props.id)}>
            {' '}
            Edit{' '}
          </PrimaryButton>
          <PrimaryButton
            onClick={this.props.onDelete.bind(this, this.props.id)}
          >
            Delete
          </PrimaryButton>
        </PhotoTools>
      </PhotoWrapper>
    )
  }
}

Photo.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  inView: PropTypes.bool.isRequired
}

export default withInViewStatement(Photo)
