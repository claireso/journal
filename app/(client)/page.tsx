import { redirect } from 'next/navigation'

import { getPaginatedPhotos } from '@application/usecases'

import Welcome from '@web/features/client/Welcome'
import ListPhotos from '@web/features/photos/ListPhotos'
import { BadRequestError, NotFoundError } from '@domain/errors'

interface PageProps {
  searchParams: {
    page?: string
  }
}

async function fetchPhotos(page?: string) {
  try {
    return await getPaginatedPhotos({ page: page ?? '1', limit: '10' })
  } catch (err) {
    if (err instanceof BadRequestError || err instanceof NotFoundError) {
      redirect('?')
    }
    throw new Error()
  }
}

export default async function Page({ searchParams }: PageProps) {
  const data = await fetchPhotos(searchParams.page)

  if (!data.items.length) {
    return <Welcome />
  }

  return <ListPhotos photos={data.items} pager={data.pager} />
}
