import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React, { Fragment, useState, useCallback } from 'react'
import { action } from 'storybook/actions'

import { ButtonNeutral } from '../Buttons'
import Toolbar from '../Toolbar'
import Modal from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal
}

export default meta
type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  render() {
    // oxlint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setOpen] = useState(false)

    // oxlint-disable-next-line react-hooks/rules-of-hooks
    const onClose = useCallback(() => {
      setOpen(false)
      action('on close')()
    }, [setOpen])

    return (
      <Fragment>
        <Toolbar>
          <ButtonNeutral
            onClick={() => {
              setOpen(true)
            }}
            style={{ padding: '10px' }}
          >
            Open modal
          </ButtonNeutral>
        </Toolbar>
        {isOpen && (
          <Modal title="Modal title" onClose={onClose}>
            <p>content</p>
          </Modal>
        )}
      </Fragment>
    )
  }
}
