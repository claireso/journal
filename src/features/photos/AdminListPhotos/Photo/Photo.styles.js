import styled from 'styled-components'

export const PhotoWrapper = styled.li`
  align-items: center;
  display: grid;
  grid-template-columns: 8rem auto 12rem;
  grid-column-gap: 1.6rem;
  padding: 2rem;
  transition: background 150ms ease-out;
  &:hover {
    background: var(--secondary-lighter);
  }
  & + & {
    border-top: 1px solid var(--secondary-normal);
  }
`

export const PhotoPicture = styled.div`
  height: 8rem;

  img {
    height: 100%;
    object-fit: contain;
    width: 100%;

    filter: drop-shadow(0 -6px 0 currentColor) drop-shadow(0 6px 0 currentColor) drop-shadow(-6px 0 0 currentColor)
      drop-shadow(6px 0 0 currentColor);
  }
`

export const PhotoInner = styled.div`
  flex: 1;
`

export const PhotoTitle = styled.h2`
  font-size: var(--font-size-normal);
  margin: 0.4rem 0 1.2rem;
  font-weight: 500;
`

export const PhotoDescription = styled.p`
  color: var(--gray-darker-2);
  font-size: var(--font-size-smaller);
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
