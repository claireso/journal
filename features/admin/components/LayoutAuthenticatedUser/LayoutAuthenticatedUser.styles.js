import styled from 'styled-components'

import AdminLink from '@components/admin/Links'
import { Button } from '@components/admin/Buttons'

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
  border-left: 1px solid var(--gray-1);
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

export const LinkGoToWebsite = styled(AdminLink)`
  box-shadow: 0 1px 0 var(--gray-5) inset;
  display: flex;
  line-height: 1.4;
  padding: 2rem 2rem 2rem 4rem;
`

export const ButtonToSignOut = styled(Button)`
  background: transparent;
  color: var(--white);
  border: 1px solid var(--gray-5);
  display: block;
  line-height: 1;
  max-width: 10rem;
  padding: 0.8rem 1.2rem;
  &:hover {
    background: var(--gray-5);
    color: var(--text);
  }
`

export const ToolbarWrapper = styled.div`
  grid-area: toolbar;
  position: sticky;
  top: 0;
  z-index: 10;
`
