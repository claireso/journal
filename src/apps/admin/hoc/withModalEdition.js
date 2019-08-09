import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import Modal from '@admin/components/Modal'

export default (
  WrappedComponent,
  { loadData = () => {}, getModalChildComponent = () => {} }
) => {
  class ComponentWithModalEdition extends React.Component {
    componentDidMount() {
      const query = this.getSearchParams()
      const params = {}

      if (query.page !== undefined) {
        params['page'] = query.page
      }

      loadData(params, this.props)
    }

    componentDidUpdate(prevProps) {
      const prevQuery = this.getSearchParams(prevProps.location)
      const query = this.getSearchParams()

      if (prevQuery.page !== query.page) {
        loadData({ page: query.page }, this.props)
        window.scrollTo(0, 0)
      }
    }

    getSearchParams = loc => {
      if (!loc) loc = this.props.location

      return qs.parse(loc.search.substring(1))
    }

    navigate = (params = {}) => {
      const query = this.getSearchParams()

      const search = qs.stringify({
        ...query,
        ...params
      })

      this.props.navigate(`?${search}`)
    }

    getModal = () => {
      const query = this.getSearchParams()
      const action = query.action
      const id = Number(query.id)

      const onClose = () => this.navigate({ action: undefined, id: undefined })

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
      return (
        <WrappedComponent
          {...this.props}
          navigate={this.navigate}
          getModal={this.getModal}
        />
      )
    }
  }

  ComponentWithModalEdition.propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  return ComponentWithModalEdition
}
