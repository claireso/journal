import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const PosedPicture = posed.img({
  enter: {
    opacity: 1,
    transition: { duration: 500, ease: 'easeOut' }
  },
  exit: { opacity: 0 }
})

export default class LazyLoadedImage extends React.PureComponent {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    const img = new Image()
    img.src = this.props.src

    img.onload = () => this.setState({isLoaded: true})
  }

  render() {
    return (
      <PoseGroup>
        {this.state.isLoaded && <PosedPicture key="image" {...this.props} />}
      </PoseGroup>
    )
  }
}