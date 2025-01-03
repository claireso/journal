import Toolbar from '@web/components/Toolbar'
import { Heading2 } from '@web/components/Headings'

import AdminListPhotos from '@web/features/photos/AdminListPhotos'
import ModalCreatePhoto from '@web/features/photos/ModalCreatePhoto'
import ModalDeletePhoto from '@web/features/photos/ModalDeletePhoto'
import ModalEditPhoto from '@web/features/photos/ModalEditPhoto'
import ButtonCreatePhoto from '@web/features/photos/ButtonCreatePhoto'
import { AdminAction } from '@utils/constant'

import * as cls from './styles.css'

type PhotosProps = object

const PagePhotos = async ({ searchParams }: NextPageProps<PhotosProps>) => {
  const { action, page, id: photoId } = await searchParams

  return (
    <>
      <Toolbar className={cls.header}>
        <Heading2>Your photos</Heading2>
        <ButtonCreatePhoto />
      </Toolbar>

      <AdminListPhotos page={(page as string) ?? '1'} />

      {action === AdminAction.CREATE && <ModalCreatePhoto />}
      {action === AdminAction.DELETE && <ModalDeletePhoto photoId={photoId as string} />}
      {action === AdminAction.EDIT && <ModalEditPhoto photoId={photoId as string} />}
    </>
  )
}

export default PagePhotos
