import React from 'react'

import type { LoaderVariants } from './styles.css'
import * as cls from './styles.css'

type LoaderProps = React.ComponentProps<'button'> & LoaderVariants

const Loader = ({ variant = 'primary' }: LoaderProps) => <span className={cls.loader({ variant })} />

export default Loader
