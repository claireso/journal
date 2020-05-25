import PropTypes from 'prop-types'
import * as S from './Tabs.styles'

const Tab = ({ isActive, children } = {}) => {
  return <S.TabWrapper isActive={isActive}>{children}</S.TabWrapper>
}

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Tab
