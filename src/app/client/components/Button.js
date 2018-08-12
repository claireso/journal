import React from 'react'

export default ({label, ...props}) => {
  return (
    <button {...props}>
      { label }
    </button>
  )
}