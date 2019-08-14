import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import extractQueryFromLocation from '@common/utils/extractQueryFromLocation'

/**
 * HOC to create a custom 'navigate' property in order to modify the url query string
 */
export default WrappedComponent => {
  const ComponentWithNavigate = props => {
    const { navigate: originalNavigate, location } = props

    const navigate = useCallback(
      params => {
        const query = extractQueryFromLocation(location)

        const search = qs.stringify({
          ...query,
          ...params
        })

        originalNavigate(`?${search}`)
      },
      [originalNavigate, location]
    )

    return <WrappedComponent {...props} navigate={navigate} />
  }

  ComponentWithNavigate.propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  return ComponentWithNavigate
}
