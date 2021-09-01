/* eslint-disable react/prop-types */
import React from 'react'
const styleSheet = {
  color: '#e55353',
}
const ErrorLabel = (props) => {
  return (
    <>
      <span style={styleSheet}>{props.message}</span>
    </>
  )
}

export default ErrorLabel
