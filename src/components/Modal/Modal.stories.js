import React, { Fragment, useState, useCallback } from 'react'
import { action } from '@storybook/addon-actions'

import Modal from './index'
import Toolbar from '../Toolbar'
import { PrimaryButton } from '../Buttons'

export default {
  title: 'Modal',
  decorators: [(storyFn) => <div style={{ margin: '-8px' }}>{storyFn()}</div>]
}

export const Basic = () => {
  const [isOpen, setOpen] = useState(false)

  const onClose = useCallback(() => {
    setOpen(false)
    action('on close')()
  }, [setOpen])

  return (
    <Fragment>
      <Toolbar>
        <PrimaryButton
          onClick={() => {
            setOpen(true)
          }}
          style={{ padding: '10px' }}
        >
          Open modal
        </PrimaryButton>
      </Toolbar>
      <Modal isOpen={isOpen} onClose={onClose}>
        <p>content</p>
      </Modal>
    </Fragment>
  )
}
