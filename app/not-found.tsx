'use client'

import Link from 'next/link'

import * as S from './NotFound.styles'

export default function NotFound() {
  return (
    <S.Wrapper>
      <S.Title>▸ 404 ◂</S.Title>
      <S.ButtonBack>
        <Link href="/">Back</Link>
      </S.ButtonBack>
    </S.Wrapper>
  )
}
