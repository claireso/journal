import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring'

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
`

const ModalInner = styled.div`
  background: var(--white);
  border: 2rem solid var(--secondary);
  padding: 4rem;
  max-width: 69rem;
  margin: calc(var(--gutter) * 4) auto;
`

class Modal extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = event => {
    if (event && event.keyCode === 27) {
      this.close()
    }
  }

  handleClick = event => {
    const target = event.target

    if (
      target.contains(this.content) &&
      !target.classList.contains('modal__inner')
    ) {
      this.close()
    }
  }

  close() {
    const { onClose } = this.props

    onClose && onClose()
  }

  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {wrapperStyles => (
          <ModalWrapper
            style={wrapperStyles}
            id="modal"
            onClick={this.handleClick}
          >
            <Spring
              from={{ transform: 'translate3d(0, 2rem, 0)' }}
              to={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {innerStyles => (
                <ModalInner
                  ref={c => {
                    this.content = c
                  }}
                  style={innerStyles}
                >
                  {this.props.children}
                </ModalInner>
              )}
            </Spring>
          </ModalWrapper>
        )}
      </Spring>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default Modal
