import React from 'react'

export default class Modal extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event && event.keyCode === 27) {
      this.close()
    }
  }

  handleClick = (event) => {
    const target = event.target

    if (target.contains(this.content) && !target.classList.contains('modal__inner')) {
      this.close()
    }
  }

  close() {
    const { onClose } = this.props

    onClose && onClose()
  }

  render() {
    return (
      <div className="modal" onClick={ this.handleClick }>
        <div ref={ c => this.content = c } className="modal__inner">
          { this.props.children }
        </div>
      </div>
    )
  }
}