import PropTypes from 'prop-types'
import * as S from './Tabs.styles'

const Tab = ({ isActive, children } = {}) => {
  return <S.TabWrapper isActive={isActive}>{children}</S.TabWrapper>
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool
}

export default Tab
