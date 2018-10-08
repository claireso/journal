import React from 'react'
import { Spring } from 'react-spring'

export default class LazyLoadedImage extends React.PureComponent {
  state = {
    isLoaded: false
  }

  componentDidMount() {
    const img = new Image()
    img.src = this.props.src

    img.onload = () => this.setState({ isLoaded: true })
  }

  render() {
    if (!this.state.isLoaded) return null

    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ tension: 120, friction: 70 }}
      >
        {props => <img style={props} {...this.props} />}
      </Spring>
    )
  }
}
