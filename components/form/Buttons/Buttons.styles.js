import styled from 'styled-components'

import Loader from '@components/Loader'

export const SubmitButton = styled.input.attrs(() => ({
  type: 'submit'
}))`
  appearance: none;
  background: var(--primary-normal);
  border: none;
  border-radius: 3.6rem;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 1.4rem;
  line-height: 1;
  margin: 2.8rem auto 0;
  outline: none;
  padding: 1.6rem 5.2rem;
  transition: background 150ms ease-out;

  &:hover {
    background: var(--primary-lighter);
  }
`

export const SubmitButtonLoading = styled.div.attrs(() => ({
  children: <Loader />
}))`
  margin: 2.8rem 0 0;
  padding: 1.8rem 0 1.8rem;

  ${Loader} {
    margin: 0 auto;
  }
`
