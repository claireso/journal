import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-spring/renderprops.cjs'

import { ButtonIcon } from '@admin/components/Buttons'
import { IconClose } from '@common/components/Icons'

const ModalWrapper = styled.div`
  background: rgba(43, 44, 44, 0.4);
  bottom: 0;
  overflow: auto;
  position: fixed;
  left: 15rem;
  right: 0;
  top: var(--toolbar-height);
  will-change: opacity;
`

const ModalInner = styled.div`
  background: var(--white);
  box-shadow: 0 0px 11px #898c8e;
  padding: 3rem;
  max-width: 45rem;
  min-height: calc(100vh);
  margin: 0 0 0 auto;
`

const ModalCloseButton = styled(ButtonIcon)`
  position: absolute;
  right: 0.5rem;
  top: 1.5rem;
`

class Modal extends React.PureComponent {
  static DEFAULT_SPEED = 350

  constructor(props) {
    super(props)
    this.content = React.createRef()
    this.state = {
      isOpen: props.isOpen
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({ isOpen: this.props.isOpen })
    }
  }

  handleKeyDown = event => {
    if (event && event.keyCode === 27) {
      this.close()
    }
  }

  handleClick = event => {
    const target = event.target

    if (
      target.contains(this.content.current) &&
      !(target.getAttribute('id') === 'modalInner')
    ) {
      this.close()
    }
  }

  close = () => {
    this.setState({ isOpen: false })
    const { onClose } = this.props

    onClose && setTimeout(() => onClose(), Modal.DEFAULT_SPEED + 100)
  }

  render() {
    const { isOpen } = this.state

    return (
      <Transition
        items={isOpen}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={{ tension: Modal.DEFAULT_SPEED }}
      >
        {isOpen =>
          isOpen &&
          (wrapperStyles => (
            <ModalWrapper
              style={wrapperStyles}
              id="modal"
              onClick={this.handleClick}
            >
              <Transition
                items={isOpen}
                from={{ opacity: 0, transform: 'translate3d(4rem, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(4rem, 0, 0)' }}
                config={{ delay: Modal.DEFAULT_SPEED - 150 }}
              >
                {isOpen =>
                  isOpen &&
                  (innerStyles => (
                    <ModalInner
                      id="modalInner"
                      ref={this.content}
                      style={innerStyles}
                    >
                      <ModalCloseButton onClick={this.close}>
                        <IconClose width="20" height="26" />
                      </ModalCloseButton>
                      {this.props.children &&
                        React.cloneElement(this.props.children, {
                          onClose: this.close
                        })}
                    </ModalInner>
                  ))
                }
              </Transition>
            </ModalWrapper>
          ))
        }
      </Transition>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
}

export default Modal
