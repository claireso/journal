import React, { Fragment, useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { action } from 'storybook/actions'

import Modal from './Modal'
import Toolbar from '../Toolbar'
import { ButtonNeutral } from '../Buttons'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal
}

export default meta
type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  render() {
    const [isOpen, setOpen] = useState(false)

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
