import React from 'react'
import PropTypes from 'prop-types'

import * as S from './Photo.styles'

import withInViewStatement from '@utils/hoc/withInViewStatement'

import LazyLoadedImage from '@components/LazyLoadedImage'
import { IconPencil, IconDelete } from '@components/Icons'
import { ButtonIcon } from '@components/Buttons'

class Photo extends React.PureComponent {
  render() {
    return (
      <S.PhotoWrapper>
        <S.PhotoPicture style={{ color: this.props.color || 'transparent' }}>
          {this.props.inView && (
            <LazyLoadedImage src={`/uploads/${this.props.name}`} />
          )}
        </S.PhotoPicture>
        <S.PhotoInner>
          {this.props.title && (
            <S.PhotoTitle
              dangerouslySetInnerHTML={{ __html: this.props.title }}
            />
          )}
          {this.props.description && (
            <S.PhotoDescription>{this.props.description}</S.PhotoDescription>
          )}
        </S.PhotoInner>
        <S.PhotoTools>
          <ButtonIcon
            onClick={this.props.onEdit.bind(this, this.props.id)}
            title="Edit"
          >
            <IconPencil />
          </ButtonIcon>
          <ButtonIcon
            onClick={this.props.onDelete.bind(this, this.props.id)}
            title="Delete"
          >
            <IconDelete />
          </ButtonIcon>
        </S.PhotoTools>
      </S.PhotoWrapper>
    )
  }
}

Photo.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  inView: PropTypes.bool.isRequired
}

export default withInViewStatement(Photo)
