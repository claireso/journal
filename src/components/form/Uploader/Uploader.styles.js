import styled from 'styled-components'

export const UploaderWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 0.4rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  overflow: hidden;
  position: relative;
`

export const UploaderPreview = styled.div`
  background: ${(props) => props.backgroundColor || 'var(--secondary-normal)'};
  padding: 2rem;

  img {
    display: block;
    max-width: 100%;
    max-height: 17rem;
    margin: 0 auto;
  }
`

export const UploaderContent = styled.div`
  padding: 2rem;

  svg {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--primary-normal);
    margin: 0 auto;
  }
  span {
    display: block;
    font-size: var(--font-size-normal);
    margin: 1rem 0 0;
    text-align: center;
  }
  small {
    color: var(--border-color-focus);
    display: block;
    font-size: var(--font-size-smaller);
    margin: 0.5rem 0 0;
    text-align: center;
  }
`

export const UploaderInput = styled.input`
  bottom: 0;
  cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`

export const UploaderError = styled.div`
  color: var(--error-normal);
  font-size: var(--font-size-smaller);
  margin: 0.8rem 0 2rem;
  text-align: center;
`
