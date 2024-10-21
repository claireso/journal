import React from 'react'

import * as cls from './styles.css'

interface LabelProps extends React.ComponentProps<'label'> {
  children: React.ReactNode
}

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className={cls.label} {...props}>
      {children}
    </label>
  )
}

export default Label
