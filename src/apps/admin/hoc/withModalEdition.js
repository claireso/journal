import React from 'react'
import PropTypes from 'prop-types'

import extractQueryFromLocation from '@common/utils/extractQueryFromLocation'
import Modal from '@admin/components/Modal'

/**
 * HOC to open / close the CRUD Modal according url parameters
 */
export default (WrappedComponent, getModalChildComponent = () => {}) => {
  class ComponentWithModalEdition extends React.Component {
    getModal = () => {
      const query = extractQueryFromLocation(this.props.location)
      const action = query.action
      const id = Number(query.id)

      const onClose = () =>
        this.props.navigate({ action: undefined, id: undefined })

      const component = getModalChildComponent(id, action, this.props)

      if (component === null) {
        return null
      }

      return (
        <Modal isOpen={!!action} onClose={onClose}>
          {component}
        </Modal>
      )
    }

    render() {
      return <WrappedComponent {...this.props} modal={this.getModal()} />
    }
  }

  ComponentWithModalEdition.propTypes = {
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  }

  return ComponentWithModalEdition
}
