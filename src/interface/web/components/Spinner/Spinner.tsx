import React from 'react'

import type { SpinnerVariants } from './styles.css'
import * as cls from './styles.css'

type SpinnerProps = {} & SpinnerVariants

const Spinner = ({ variant = 'currentcolor', size }: SpinnerProps) => <div className={cls.spinner({ variant, size })} />

export default Spinner
