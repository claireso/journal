import { notFound } from 'next/navigation'

import * as api from '@services/api'
import ApiError from '@services/api/ApiError'

import Welcome from '@features/client/Welcome'
import ListPhotos from '@features/photos/ListPhotos'

interface PageProps {
  searchParams: {
    page?: string
  }
}

async function fetchPhotos(page?: string) {
  try {
    return await api.getPhotos(page ?? '1')
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.response.status === 404) {
        notFound()
      }
      // with next@15 we will be able to use unstable_rethrow
      // unstable_rethrow(err)
      throw new ApiError(err.response)
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
