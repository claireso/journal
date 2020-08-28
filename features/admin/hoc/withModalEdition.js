import React from 'react'
import { useRouter } from 'next/router'

import Modal from '@components/Modal'

/**
 * HOC to open / close the CRUD Modal according url parameters
 */

const withModalEdition = (getModalChildComponent = () => {}) => (
  WrappedComponent
) => {
  const getModal = (router) => {
    const { pathname, query } = router
    const { action } = query
    const id = Number(query.id)

    const onClose = () => {
      const _query = {}

      if (query.page) {
        _query['page'] = query.page
      }

      router.push({ pathname: pathname, query: _query })
    }

    const component = getModalChildComponent(id, action)

    if (component === null) {
      return null
    }

    return (
      <Modal testId="modal" isOpen={!!action} onClose={onClose}>
        {component}
      </Modal>
    )
  }

  const ComponentWithModalEdition = () => {
    const router = useRouter()

    return <WrappedComponent modal={getModal(router)} />
  }

  return ComponentWithModalEdition
}

export default withModalEdition
