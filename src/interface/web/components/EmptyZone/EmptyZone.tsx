import React from 'react'
import Text from '../Text'

interface EmptyZoneProps {
  children: string
}

const EmptyZone = ({ children }: EmptyZoneProps) => {
  return (
    <Text size="sm" italic color="neutral">
      {children}
    </Text>
  )
}

export default EmptyZone
