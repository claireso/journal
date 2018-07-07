import React from 'react'

export default ({status, message}) => {
  let cls = 'flash'

  if (status === 'error') {
    cls += ' flash--error'
  }

  return (
    <div className={ cls }>
      { message }
    </div>
  )
}