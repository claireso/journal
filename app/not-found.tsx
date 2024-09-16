'use client'

import * as S from './NotFound.styles'

export default function NotFound() {
  return (
    <S.Wrapper>
      <S.Title>▸ 404 ◂</S.Title>
      <S.ButtonBack>
        <a href="/">Back</a>
      </S.ButtonBack>
    </S.Wrapper>
  )
}
