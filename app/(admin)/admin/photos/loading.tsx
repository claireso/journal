import Toolbar from '@web/components/Toolbar'
import { Heading2 } from '@web/components/Headings'
import { Loader } from '@web/components/Loader'

import * as cls from './styles.css'

export default function Loading() {
  return (
    <>
      <Toolbar className={cls.header}>
        <Heading2>Your photos</Heading2>
      </Toolbar>
      <Loader />
    </>
  )
}
