import React from 'react'
import PropTypes from 'prop-types'

import withInViewStatement from '@utils/hoc/withInViewStatement'

import * as S from './Photo.styles'

class Photo extends React.PureComponent {
  render() {
    const { portrait, square, color } = this.props

    return (
      <S.PhotoWrapper
        portrait={portrait}
        square={square}
        position={this.props.position}
        row={this.props.row}
        color={color}
      >
        <S.PictureWrapper
          style={{
            color: color || 'var(--secondary-normal)',
            '--aspect-ratio': portrait ? 2 / 3 : square ? 1 / 1 : 3 / 2
          }}
        >
          {this.props.inView && <S.Picture name={this.props.name} />}
        </S.PictureWrapper>
        <S.Title>
          <span dangerouslySetInnerHTML={{ __html: this.props.title }} />

          {this.props.description && (
            <S.Description>{this.props.description}</S.Description>
          )}
        </S.Title>
      </S.PhotoWrapper>
    )
  }
}

Photo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  portrait: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  square: PropTypes.bool.isRequired,
  color: PropTypes.string,
  row: PropTypes.number.isRequired,
  inView: PropTypes.bool.isRequired
}

export default withInViewStatement(Photo)
