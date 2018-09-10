import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { IconUpload } from '../Icons'

const createThumbnail = file =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(file)
  })

const UploaderWrapper = styled.div`
  border: 1px solid var(--gray-1);
  padding: 2rem;
  position: relative;
`

const UploaderPreview = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 17rem;
    margin: 0 auto var(--gutter);
  }
`

const UploaderContent = styled.div`
  svg {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--primary);
    margin: 0 auto;
  }

  span {
    display: block;
    font-size: 1.4rem;
    margin: 1rem 0 0;
    text-align: center;
  }

  small {
    color: var(--gray-2);
    display: block;
    font-size: 1.2rem;
    margin: 0.5rem 0 0;
    text-align: center;
  }
`

const UploaderInput = styled.input`
  bottom: 0;
  cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`

const UploaderError = styled.div`
  color: var(--error);
`

class Uploader extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      preview: props.preview
    }
  }

  handleChange = async event => {
    const { accept } = this.props

    const files = event.target.files

    if (files.length === 0) return

    const file = files[0]

    if (!file) return

    if (!accept.includes(file.type)) {
      this.setState({
        preview: null,
        error: 'This file is not allowed'
      })
      this.input.value = ''
      return
    }

    try {
      const thumbnail = await createThumbnail(file)

      this.setState({ preview: thumbnail, error: null })
    } catch (err) {
      /* eslint-disable */
      console.error(err)
    }
  }

  render() {
    const { preview, error } = this.state

    return (
      <UploaderWrapper>
        {preview && (
          <UploaderPreview>
            <img src={preview} />
          </UploaderPreview>
        )}
        <UploaderContent>
          <IconUpload />
          <span>Upload new photo</span>
          <small>(only jpg and png)</small>
          <UploaderInput
            ref={c => (this.input = c)}
            type="file"
            name={this.props.name}
            onChange={this.handleChange}
            required={this.props.required}
          />
        </UploaderContent>
        {error && <UploaderError>{error}</UploaderError>}
      </UploaderWrapper>
    )
  }
}

Uploader.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.string,
  accept: PropTypes.array,
  required: PropTypes.bool
}

export default Uploader
