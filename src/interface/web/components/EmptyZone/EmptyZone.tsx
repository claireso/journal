import { Text } from './EmptyZone.styles'

interface EmptyZoneProps {
  children: string
}

const EmptyZone = ({ children }: EmptyZoneProps) => {
  return <Text>{children}</Text>
}

export default EmptyZone
