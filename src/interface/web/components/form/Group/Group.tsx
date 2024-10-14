import React from 'react'

import * as cls from './styles.css'

interface GroupProps {
  children: React.ReactNode
  inline?: boolean
}

const Group = ({ inline = false, children }: GroupProps) => {
  return <div className={cls.wrapper({ inline })}>{children}</div>
}

export default Group
