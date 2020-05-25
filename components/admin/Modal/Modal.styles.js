import styled from 'styled-components'

import { ButtonIcon } from '../Buttons'

export const ModalWrapper = styled.div`
  background: rgba(43, 44, 44, 0.4);
  bottom: 0;
  overflow: auto;
  position: fixed;
  left: 15rem;
  right: 0;
  top: var(--toolbar-height);
  will-change: opacity;
`

export const ModalInner = styled.div`
  background: var(--white);
  box-shadow: 0 0px 11px #898c8e;
  padding: 2rem;
  max-width: 45rem;
  min-height: calc(100vh);
  margin: 0 0 0 auto;
`

export const ModalCloseButton = styled(ButtonIcon)`
  position: absolute;
  right: 1.2rem;
  top: 1.5rem;
`
