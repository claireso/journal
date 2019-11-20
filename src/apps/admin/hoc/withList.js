import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import extractQueryFromLocation from '@common/utils/extractQueryFromLocation'
import usePrevious from '@common/hooks/usePrevious'

/* HOC to fetch data when :
  - component is mounted
  - user is changing page
*/
export default (loadData = () => {}) => WrappedComponent => {
  const ComponentWithList = props => {
    const { location } = props
    const previousLocation = usePrevious(location)

    // didMount
    useEffect(() => {
      const query = extractQueryFromLocation(location)
      const params = {}

      if (query.page !== undefined) {
        params['page'] = query.page
      }

      loadData(params, props)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // didUpdate
    useEffect(() => {
      if (!previousLocation) return

      const prevQuery = extractQueryFromLocation(previousLocation)
      const query = extractQueryFromLocation(location)

      if (prevQuery.page !== query.page) {
        loadData({ page: query.page }, props)
        window.scrollTo(0, 0)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, previousLocation])

    return <WrappedComponent {...props} />
  }

  ComponentWithList.propTypes = {
    location: PropTypes.object.isRequired
  }

  return ComponentWithList
}
