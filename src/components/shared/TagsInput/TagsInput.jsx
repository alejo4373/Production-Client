import React from 'react'
import '../../../styles/control-strip.css'

const TagsInput = ({ onChange, value }) => {
  return (
    <input
      className="control-strip__control"
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={'Tags: work, misc, etc.'}
      type="text"
    />
  )
}

export default TagsInput
