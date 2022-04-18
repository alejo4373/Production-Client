import React from 'react'

const TagsInput = ({ onChange, value }) => {
  return (
    <input
      className="control"
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={'Tags: work, misc, etc.'}
      type="text"
    />
  )
}

export default TagsInput
