import './Tags.css'
import Icon from './Icon'
import React from 'react'
import Tag from './Tag'

export const Tags = ({ tags, handleRemoveTag, areTodoTags }) => {
  return (
    <div className="tags">
      <Icon className="tags__icon" src="/icons/tag.svg" alt="tags" />
      <ul className="tags__list">
        {tags.map(tag => (
          <Tag
            key={tag}
            name={tag}
            handleRemoveTag={handleRemoveTag}
            isTodoTag={areTodoTags}
          />
        ))}
      </ul>
    </div>
  )
}

export default Tags
