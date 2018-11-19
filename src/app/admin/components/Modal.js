import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-spring'

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  will-change: opacity;
`

const ModalInner = styled.div`
  background: var(--white);
  border: 2rem solid var(--secondary);
  border-radius: 0.4rem;
  padding: 4rem;
  max-width: 69rem;
  margin: calc(var(--gutter) * 4) auto;
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
      !target.classList.contains('modal__inner')
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
                from={{ transform: 'translate3d(0, 2rem, 0)' }}
                enter={{ transform: 'translate3d(0, 0, 0)' }}
                leave={{ transform: 'translate3d(0, 2rem, 0)' }}
                config={{ tension: Modal.DEFAULT_SPEED }}
              >
                {isOpen =>
                  isOpen &&
                  (innerStyles => (
                    <ModalInner ref={this.content} style={innerStyles}>
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
