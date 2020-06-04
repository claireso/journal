import styled from 'styled-components'

import { StyledButton } from '@components/Buttons'

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 6rem auto;
  grid-template-areas:
    'title toolbar'
    'sidebar content';
  min-height: 100vh;
`

export const Sidebar = styled.div`
  grid-area: sidebar;
`

export const Content = styled.div`
  background: var(--white);
  border-left: 1px solid var(--gray-normal);
  box-shadow: 0 6px 6px #e0dede;
  grid-area: content;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  grid-area: title;
  line-height: 6rem;
  margin: 0;
  text-align: center;
`

export const LinkGoToWebsite = styled.a`
  display: flex;
  align-items: center;
  color: var(--text-normal);
  font-size: 1.2rem;

  box-shadow: 0 1px 0 var(--white) inset;
  line-height: 1.4;
  padding: 2rem 2rem 2rem 4rem;

  &:hover {
    color: var(--primary-normal);
  }

  > svg {
    margin: 0 0 0 0.4rem;
  }
`

export const ButtonToSignOut = styled(StyledButton)`
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
  display: block;
  line-height: 1;
  max-width: 10rem;
  padding: 0.8rem 1.2rem;

  &:hover {
    background: var(--white);
    color: var(--text-normal);
  }
`

export const ToolbarWrapper = styled.div`
  grid-area: toolbar;
  position: sticky;
  top: 0;
  z-index: 10;
`
