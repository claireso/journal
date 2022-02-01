import React from 'react'
import PropTypes from 'prop-types'

import * as S from './Text.styles'

const Text = ({ align, ...props }) => <S.Text align={align} {...props} />

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right'])
}

Text.defaultProps = {
  align: 'left'
}

export default Text
