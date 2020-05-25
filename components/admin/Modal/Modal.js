import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring/renderprops.cjs'

import { IconClose } from '@components/Icons'

import * as S from './Modal.styles'

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

  handleKeyDown = (event) => {
    if (event && event.keyCode === 27) {
      this.close()
    }
  }

  handleClick = (event) => {
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
        {(isOpen) =>
          isOpen &&
          ((wrapperStyles) => (
            <S.ModalWrapper
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
                {(isOpen) =>
                  isOpen &&
                  ((innerStyles) => (
                    <S.ModalInner
                      id="modalInner"
                      ref={this.content}
                      style={innerStyles}
                    >
                      <S.ModalCloseButton onClick={this.close}>
                        <IconClose width="20" height="26" />
                      </S.ModalCloseButton>
                      {this.props.children &&
                        React.cloneElement(this.props.children, {
                          onClose: this.close
                        })}
                    </S.ModalInner>
                  ))
                }
              </Transition>
            </S.ModalWrapper>
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
