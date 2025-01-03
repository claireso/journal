import { redirect } from 'next/navigation'

import { getPaginatedPhotos } from '@application/usecases'

import Welcome from '@web/features/client/Welcome'
import ListPhotos from '@web/features/photos/ListPhotos'
import { BadRequestError, NotFoundError } from '@domain/errors'

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

type PageProps = object

export default async function Page({ searchParams }: NextPageProps<PageProps>) {
  const { page } = await searchParams

  const data = await fetchPhotos(page as string)

  if (!data.items.length) {
    return <Welcome />
  }

  return <ListPhotos photos={data.items} pager={data.pager} />
}
