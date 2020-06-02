import styled from 'styled-components'

export const UploaderWrapper = styled.div`
  border: 1px solid var(--gray-1);
  border-radius: 0.4rem;
  box-shadow: 1px 1px 3px var(--box-shadow);
  padding: 2rem;
  position: relative;
`

export const UploaderPreview = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 17rem;
    margin: 0 auto var(--gutter);
  }
`

export const UploaderContent = styled.div`
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
  color: var(--error);
`
