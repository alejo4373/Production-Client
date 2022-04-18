import React from 'react'

const Icon = ({ alt, src, ...rest }) => {
  return <img className="icon" src={src} alt={alt} {...rest} />
}

export default Icon
