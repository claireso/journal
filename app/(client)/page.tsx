import * as api from '@services/api'

import Welcome from '@features/client/Welcome'
import ListPhotos from '@features/photos/ListPhotos'

interface PageProps {
  searchParams: {
    page?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const data = await api.getPhotos(searchParams.page ?? '1')

  if (!data || !data.items.length) {
    return <Welcome />
  }

  return <ListPhotos photos={data.items} pager={data.pager} />
}
