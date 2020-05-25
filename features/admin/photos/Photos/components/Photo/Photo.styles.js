import styled from 'styled-components'

export const PhotoWrapper = styled.li`
  align-items: center;
  display: grid;
  grid-template-columns: 8rem auto 12rem;
  grid-column-gap: 1rem;
  padding: 1.4rem;
  transition: background 150ms ease-out;
  &:hover {
    background: var(--gray-5);
  }
  & + & {
    border-top: 1px solid var(--secondary);
  }
`

export const PhotoPicture = styled.div`
  height: 8rem;
  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
`

export const PhotoInner = styled.div`
  flex: 1;
`

export const PhotoTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0.4rem 0 1.2rem;
`

export const PhotoDescription = styled.p`
  color: var(--gray-3);
  font-size: 1.2rem;
`

export const PhotoTools = styled.p`
  place-self: center flex-end;
  transition: opacity 150ms ease-out;
  button {
    opacity: 0.5;
    transition: opacity 150ms ease-out;
    &:hover {
      opacity: 1;
    }
  }
`
