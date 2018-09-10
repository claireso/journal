import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  background: #fff;
  border: 2rem solid #ecf0f1;
  padding: 4rem;
  max-width: 69rem;
  margin: 8rem auto;
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
      <ModalWrapper onClick={this.handleClick}>
        <ModalInner
          ref={c => {
            this.content = c
          }}
        >
          {this.props.children}
        </ModalInner>
      </ModalWrapper>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default Modal
